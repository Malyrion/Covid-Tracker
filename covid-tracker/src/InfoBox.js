import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"
function InfoBox({title, cases, total}) {
  return (
    <Card>
      {/*Cases title*/}
        <Typography className="infoBox__title" color="textSecondary">
        {title}
        </Typography>

        <h2 class ="infoBox__cases">{cases}</h2>
      {/*+10 number of cases*/}
        <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
      {/*1.2 m total*/}
    </Card>
  )
}

export default InfoBox
