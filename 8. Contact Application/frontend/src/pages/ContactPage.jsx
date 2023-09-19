import React, { useEffect } from 'react'
import {useParams} from "react-router-dom";

function ContactPage() {

    const params = useParams();

    useEffect(() => {
     console.log(params.contactId);
    }, [])
    

  return (
    <div>{params.contactId}</div>
  )
}

export default ContactPage