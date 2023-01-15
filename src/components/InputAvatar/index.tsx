import { IconButton } from "@mui/material";
import 'react-image-crop/dist/ReactCrop.css'
import {
  User
} from "../../models/user.model";
import { FileInput, Label, Icon, AvatarContainer } from "./styles";
import NotPhotoUser from "../../../src/assets/notphoto.svg";
import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { api } from "../../Config/api";
import SendNewAvatarPopUp from "./SendNewAvatarPopUp";

type Props = {
  user: User | null;
  image: any;
  setImage: React.Dispatch<any>;
};

export const InputAvatar = ({ user, image, setImage }: Props) => {

  const [openNewImage, setOpenNewImage] = useState(false)
  const [preview, setPreview] = useState(undefined)

  const imageEdit = () => {
    if (user && !image) {
      return user.avatar === null ? NotPhotoUser : user.avatar?.url;
    } else {
      return !image
        ? NotPhotoUser
        : URL.createObjectURL(image);
    }
  };

  const hasImageUrl = user && user.avatar;

  return (
    <AvatarContainer>
      <Label htmlFor='icon-button-file'>
        {/* <FileInput
          accept='image/*'
          id='icon-button-file'
          type='file'
          onChange={(e) => {
            // @ts-ignore: Object is possibly 'null'.
            setImage(e.target.files[0]);
          }}
        /> */}

        <IconButton
          aria-label='Upload da Imagem'
          component='span'
          style={{
            width: "fit-content",
            height: "fit-content",
            borderRadius: "8px",
            backgroundColor: "trasparent",
          }}
        >

          {preview ?
            <Icon
              onClick={() => setOpenNewImage(!openNewImage)}
              src={preview}
              alt='Envie uma imagem'
              hasImageUploaded={
                hasImageUrl ? true : image ? true : false
              }
            />
            :
            <Icon
              onClick={() => setOpenNewImage(!openNewImage)}
              src={imageEdit()}
              alt='Envie uma imagem'
              hasImageUploaded={
                hasImageUrl ? true : image ? true : false
              }
            />
          }


        </IconButton>
      </Label>

      <SendNewAvatarPopUp setPreviewMain={setPreview} open={openNewImage} setOpen={setOpenNewImage} setImage={setImage} previewMain={preview}/>
    </AvatarContainer>
  );
};

export default InputAvatar;
