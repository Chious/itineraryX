import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { editUserAccount } from '../../api/userpage';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadInput({tempAvatar, setTempAvatar}) {

  const { register, handleSubmit } = useForm();

  const onSubmit = async(data, e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", data.file[0]);

    await editUserAccount(formData)
    .then(data => {
      console.log(data)
    })

  }

  return (
        <div className="App">
            <form onSubmit={(e) => handleSubmit((data) => onSubmit(data, e))}>
                <input type="file" {...register("file")} />

                <input type="submit" />
            </form>
        </div>
  );
}
