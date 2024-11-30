import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import Divider from '../extras/divider'

export default function API() {
    const serverUrl = "http://localhost:3000";

    return (
        <div id="Rest_API">
            <Divider/>
            <SwaggerUI url={`${serverUrl}/swagger.yml`}/>
        </div>
    )
}
