<x-app-layout>
    <div id="frame">
        @include('layouts.sidebar')
        <div class="content">
            <div class="blank-wrap">
                <div class="inner-blank-wrap">Select a contact to start messaging</div>
            </div>
            <div class="loader d-none">
                <div class="loader-inner">
                    <l-square size="35" stroke="5" stroke-length="0.25" bg-opacity="0.1" speed="1.2"
                        color="black"></l-square>
                </div>
            </div>
            <div class="contact-profile">
                <img src="{{ asset('default-images/avatar.jpg') }}" alt="contact img" />
                <p class="contact-name"></p>
                <div class="social-media">

                </div>
            </div>
            <div class="messages">
                <ul>
                    {{-- Dynamic Content will go here. --}}
                </ul>
            </div>
            <div class="message-input">
                <form action="" method="POST" class="message-form">
                    @csrf
                    <div class="wrap">
                        <input type="text" placeholder="Write your message..." name="message" class="message-box"
                            autocomplete="off" />
                        <button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <x-slot name="scripts">
        @vite(['resources/js/app.js', 'resources/js/message.js'])
    </x-slot>

</x-app-layout>
