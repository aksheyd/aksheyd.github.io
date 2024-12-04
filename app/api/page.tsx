"use client"

import Divider from '../extras/divider'
// import { RedocStandalone } from 'redoc'
// import SwaggerUI from 'swagger-ui-react'
// import 'swagger-ui-react/swagger-ui.css'
// import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import 'openapi-explorer'
interface OpenApiExplorerProps {
    collapse?: boolean;
    table?: boolean;
  }
  
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        'openapi-explorer': OpenApiExplorerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
  }

export default function API() {
    return (
        <div id="Rest_API" className="min-h-screen p-6 bg-white">
            <Divider />
            {/* <RedocStandalone
                specUrl="http://localhost:3000/swagger.yml"
                // specUrl="https://portfolio-eight-lac-63.vercel.app/swagger.yml"
                options={{
                    theme: { colors: { primary: { main: '#5c67f2' } }, typography: { fontSize: '16px' } },
                    scrollYOffset: 50,
                    hideDownloadButton: false,
                    expandResponses: '200',
                    showExtensions: true,
                    showObjectSchemaExamples: true
                }}
            /> */}
            {/* <SwaggerUI url="http://localhost:3000/swagger.yml" /> */}
            <openapi-explorer spec-url="https://portfolio-eight-lac-63.vercel.app/swagger.yml">
            {/* <div slot="overview">
                <h1>The API</h1>
            </div> */}
            </openapi-explorer>

        </div>
    );
}