import { Dialog } from '@mui/material'
import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import styles from './styles.module.css'
type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setImage: React.Dispatch<any>;
    setPreviewMain: React.Dispatch<React.SetStateAction<undefined>>
    previewMain: undefined
}

export default function SendNewAvatarPopUp({ open, setOpen, setImage, setPreviewMain, previewMain }: Props) {

    const [src, setSrc] = useState(undefined)

    const onClose = () => {
        setPreviewMain(undefined)
    }

    const onCrop = (view: any) => {
        setPreviewMain(view)
    }

    const handleClose = () => {
        setOpen(false);
    };

    //   convert image to Blob

    const convert = (base64Image: any) => {
        if (base64Image) {
            const parts = base64Image.split(';base64,');

            // Hold the content type
            const imageType = parts[0].split(':')[1];

            // Decode Base64 string
            const decodedData = window.atob(parts[1]);

            // Create UNIT8ARRAY of size same as row data length
            const uInt8Array = new Uint8Array(decodedData.length);

            // Insert all character code into uInt8Array
            for (let i = 0; i < decodedData.length; ++i) {
                uInt8Array[i] = decodedData.charCodeAt(i);
            }

            console.log(new Blob([uInt8Array], { type: imageType }));

            // Return BLOB image after conversion
            return new Blob([uInt8Array], { type: imageType });
        }

    }

    useEffect(() => {
        console.log(convert(previewMain))
    }, [previewMain])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                borderRadius: "23px",
            }}
        >

            <div className={styles.set_avatar_main}>
                <Avatar
                    width={700}
                    height={300}
                    onCrop={onCrop}
                    onClose={onClose}
                    src={src}
                    label="Escolher imagem"
                ></Avatar>
            <div className={styles.actions}>
                <button onClick={() => {
                    setPreviewMain(undefined)
                    setOpen(false)
                }} className={styles.cancel_button}>Cancelar</button>
                <button onClick={() => {
                    setImage(convert(previewMain))
                    setOpen(false)
                }} className={styles.save_button}>Concluir</button>
            </div>
        </div>



            {/* <img src={preview} /> */ }


        </Dialog >
    )
}
