import axios from 'axios';
import { subscriberFormDataProps } from '../types/subscriberFormDataProps';

export async function subscribe(subscriberFormData: subscriberFormDataProps) {
  try{
    const response = await fetch("https://algovisor.onrender.com/subscriber" , {
            method: "POST",
            headers : {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(subscriberFormData),
        });
    if(response.ok){
        response.json().then((data) => {
        });
    } else {
    }
} catch (err) {
    // console.log("Dk wtf happen: ", err)
}
}
