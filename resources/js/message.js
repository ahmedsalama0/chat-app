const selectedContact = $('meta[name="selected_contact"]');
const authId = $('meta[name="auth_id"]').attr("content");
const baseUrl = $('meta[name="base_url"]').attr("content");
const inbox = $(".messages ul");

function toggleLoader() {
    $(".loader").toggleClass("d-none");
}

function messageTemplate(text, className) {
    return `
            <li class="${className}">
            <img src="${baseUrl}/default-images/avatar.jpg" alt="" />
             <p>${text}</p>
            </li>
            `;
}

function fetchMessages() {
    let contactId = selectedContact.attr("content");
    $.ajax({
        method: "GET",
        url: baseUrl + "/fetch-messages",
        data: {
            contact_id: contactId,
        },
        beforeSend: function () {
            toggleLoader();
        },
        success: function (data) {
            setContactInfo(data.contact);
            inbox.empty();
            data.messages.forEach((value) => {
                let role = value.from_id == contactId ? "replies" : "sent";
                inbox.append(messageTemplate(value.message, role));
            });

            scrollToBottom();
        },
        error: function (xhr, status, error) {},
        complete: function () {
            toggleLoader();
        },
    });
}

function sendMessage() {
    let contactId = selectedContact.attr("content");
    let formData = $(".message-form").serialize();
    let messageBox = $(".message-box");
    $.ajax({
        method: "POST",
        url: baseUrl + "/send-message",
        data: formData + "&contact_id=" + contactId,
        beforeSend: function () {
            let message = messageBox.val();
            inbox.append(messageTemplate(message, "replies"));
            messageBox.val("");

            scrollToBottom();
        },
        success: function () {},
        error: function (xhr, status, error) {},
    });
}

function setContactInfo(contact) {
    $(".contact-name").text(contact.name);
}

function scrollToBottom() {
    $(".messages")
        .stop()
        .animate({
            scrollTop: $(".messages")[0].scrollHeight,
        });
}

$(document).ready(function () {
    $(".contact").on("click", function () {
        let contactId = $(this).data("id");
        selectedContact.attr("content", contactId);

        $(".blank-wrap").addClass("d-none");

        fetchMessages();
    });

    $(".message-form").on("submit", function (e) {
        e.preventDefault();
        sendMessage();
    });
});

window.Echo.private("message." + authId).listen("SendMessageEvent", (e) => {
    if (e.from_id == selectedContact.attr("content")) {
        inbox.append(messageTemplate(e.text, "sent"));
        scrollToBottom();
    }
});

window.Echo.join("online")
    .here((users) => {
        users.forEach((user) => {
            let element = $(`.contact[data-id="${user.id}"]`);
            if (element.length > 0) {
                element
                    .find(".contact-status")
                    .removeClass("offline")
                    .addClass("online");
            }
        });
    })
    .joining((user) => {
        let element = $(`.contact[data-id="${user.id}"]`);
        if (element.length > 0) {
            element
                .find(".contact-status")
                .removeClass("offline")
                .addClass("online");
        }
    })
    .leaving((user) => {
        let element = $(`.contact[data-id="${user.id}"]`);
        if (element.length > 0) {
            element
                .find(".contact-status")
                .removeClass("online")
                .addClass("offline");
        }
    });
