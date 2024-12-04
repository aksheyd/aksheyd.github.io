"use client"

import Divider from '../extras/divider'
import { RedocStandalone } from 'redoc'

export default function API() {
    return (
        <div id="Rest_API" className="min-h-screen p-6 bg-white">
            <Divider />
            <RedocStandalone
                specUrl="https://portfolio-eight-lac-63.vercel.app/swagger.yml"
                options={{
                    theme: { colors: { primary: { main: '#5c67f2' } }, typography: { fontSize: '16px' } },
                }}
            />
        </div>
    );
}