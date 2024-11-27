import Link from 'next/link'

export default function Nav() {
    return (
        <div>
            <nav className="sticky top-0 w-full bg-white p-4 shadow-none hover:shadow-md z-50">
                <ul className="flex justify-between">
                    <li><Link href="#Intro">Intro</Link></li>
                    <li><Link href="#Work">Work</Link></li>
                    <li><Link href="#Contact">Contact</Link></li>
                    
                    <li>
                        <label className="flex items-center cursor-pointer space-x-2">
                            <span className="text-sm font-light text-gray-900 dark:text-gray-300">CPU Mode</span>
                            <input
                                type="checkbox"
                                // checked={isChecked}
                                // onChange={handleCheckboxChange}
                                value=""
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 dark:peer-focus:ring-b-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-300"></div>
                            <span className="text-sm font-light text-gray-900 dark:text-gray-300">GPU Mode</span>
                        </label>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

