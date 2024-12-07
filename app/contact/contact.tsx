'use client';
import { FormEvent, useState } from 'react'

export default function Contact() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formSending, setFormSending] = useState(false);
    const [formError, setFormError] = useState(false);


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        // reset form state
        setFormError(false);
        setFormSubmitted(false);

        setFormSending(true);
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxOr9NyqHvoOHMErqHk_yBc7hkVIBd5-WNtHu56lEu5UFp-zFyakKtR7ppzi6hawqVBBg/exec', {
                method: 'POST',
                body: formData,
            })
            setFormSending(false);

            if (!response.ok) {
                setFormError(true);
            } else {
                setFormSubmitted(true);
            }
        } catch (error) {
            console.log(error)
            setFormSubmitted(false)
            setFormSending(false)
            setFormError(true)
            return
        }
    }

    return (
        <div id="Contact" className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute transition-all duration-700 ease-in-out animate-wiggle top-5 inset-x-0 -z-50 transform-gpu overflow-hidden blur-4xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative xw-z-50 rotate-180 aspect-[1920/1080] w-full max-w-none bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-5xl font-semibold text-gray-900 sm:text-5xl">
                    Contact Me
                </h2>
            </div>
            <form onSubmit={onSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20 tracking-wider">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-lg font-light">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-lg font-light">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="last-name"
                                name="last-name"
                                type="text"
                                autoComplete="family-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-lg font-light">
                            Company
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="company"
                                name="company"
                                type="text"
                                autoComplete="organization"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base tracking-wider text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-lg font-light tracking-wider">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-lg font-light">
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="block w-full rounded-lg bg-white px-3.5 py-2 text-base text-gray-900"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 px-3.5 py-2.5 text-center text-md tracking-wider font-regular shadow-sm hover:from-indigo-200 hover:via-purple-200 hover:to-pink-200">
                        Send
                    </button>
                </div>
            </form>

            {formError && (
                <div className="mt-8 text-center text-red-600 text-lg">
                    There was an error sending your message. Please try again.
                </div>
            )}

            {formSending && (
                <div className="mt-8 text-center text-gray-600 text-lg">
                    Sending...
                </div>
            )}

            {formSubmitted && (
                <div className="mt-8 text-center text-green-600 text-lg">
                    Thank you! Your message has been sent.
                </div>
            )}
        </div>
    )
}
