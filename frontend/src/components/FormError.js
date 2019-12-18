import React from "react";

export const FormErrors = ({formErrors, resultErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      console.log('iiiiii - formErrors', formErrors);
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
    {Object.keys(resultErrors).map((i, field) => {
      console.log('jjjjjjjj - resultErrors', resultErrors);
      if(typeof resultErrors[i] !== "undefined"){
        return (
          <p key={i}>{resultErrors[i]['field']} - {resultErrors[i]['message']}</p>
        )
      } else {
        return '';
      }
    })}

  </div>