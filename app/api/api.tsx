// implenet swagger
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import Divider from '../extras/divider'

export default function API() {
    return (
        <div id="Rest_API">
            <Divider/>
            <SwaggerUI url="https://aksheyd.github.io/api" />
        </div>
    )
}
