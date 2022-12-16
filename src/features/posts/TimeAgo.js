import { formatDistanceToNow, parseISO } from "date-fns";

import React from 'react'

const TimeAgo = ({ timestamp }) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
  return (
    <div title={timestamp}>
        &nbsp; <i>{timeAgo}</i>
    </div>
  )
}

export default TimeAgo