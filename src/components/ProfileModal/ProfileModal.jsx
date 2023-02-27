import { Modal, useMantineTheme } from '@mantine/core';
import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadAction.js';
import { updateUser } from '../../actions/userAction.js';

function ProfileModal({modalOpened, setModalOpened, data}) {
  const theme = useMantineTheme();
  const {password, ...other} = data;
  const[formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const[coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch()
  const param = useParams()
  const {user} = useSelector((state)=>state.authReducer.authData)

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened = {modalOpened}
      onClose={()=>setModalOpened(false)}
    >
      <form className='infoForm'>
        <h3>Your Info</h3>

        <div>
            <input className='infoInput' type="text" name="firstname" placeholder='First Name' onChange={handleChange} value={formData.firstname} />
            <input className='infoInput' type="text" name='lastname' placeholder='Last Name' onChange={handleChange} value={formData.lastname}/>
            
           
        </div>   
        <div>
        <input className='infoInput' type="text" name='worksAt' placeholder='Works At' onChange={handleChange} value={formData.worksAt}/>
        </div>
        <div>
        <input className='infoInput' type="text" name='livesin' placeholder='Lives In' onChange={handleChange} value={formData.livesin} />
        <input className='infoInput' type="text" name='country' placeholder='Country' onChange={handleChange}  value={formData.country}/>
        </div>
        <div>
        <input className='infoInput' type="text" name='relationship' placeholder='Relationship' onChange={handleChange} value={formData.relationship} />
        </div>
        <div>
            Profile Image
            <input type="file" name='profileImage' onChange={onImageChange}/>
            Cover Image
            <input type="file" name='coverImage' onChange={onImageChange}/>
        </div>
        <button className='button infoButton' onClick={handleSubmit}>Update</button>
        

      </form>
    </Modal>
  );
}

export default ProfileModal








// import React, { useState } from "react";
// import { Modal, useMantineTheme } from "@mantine/core";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { uploadImage } from "../../actions/UploadAction";
// import { updateUser } from "../../actions/UserAction";

// const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
//   const theme = useMantineTheme();
//   const { password, ...other } = data;
//   const [formData, setFormData] = useState(other);
//   const [profileImage, setProfileImage] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);
//   const dispatch = useDispatch();
//   const param = useParams();

//   const { user } = useSelector((state) => state.authReducer.authData);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       let img = event.target.files[0];
//       event.target.name === "profileImage"
//         ? setProfileImage(img)
//         : setCoverImage(img);
//     }
//   };

  // form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let UserData = formData;
  //   if (profileImage) {
  //     const data = new FormData();
  //     const fileName = Date.now() + profileImage.name;
  //     data.append("name", fileName);
  //     data.append("file", profileImage);
  //     UserData.profilePicture = fileName;
  //     try {
  //       dispatch(uploadImage(data));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   if (coverImage) {
  //     const data = new FormData();
  //     const fileName = Date.now() + coverImage.name;
  //     data.append("name", fileName);
  //     data.append("file", coverImage);
  //     UserData.coverPicture = fileName;
  //     try {
  //       dispatch(uploadImage(data));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   dispatch(updateUser(param.id, UserData));
  //   setModalOpened(false);
  // };

//   return (
//     <Modal
//       overlayColor={
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[9]
//           : theme.colors.gray[2]
//       }
//       overlayOpacity={0.55}
//       overlayBlur={3}
//       size="55%"
//       opened={modalOpened}
//       onClose={() => setModalOpened(false)}
//     >
//       <form className="infoForm" onSubmit={handleSubmit}>
//         <h3>Your Info</h3>
//         <div>
//           <input
//             value={formData.firstname}
//             onChange={handleChange}
//             type="text"
//             placeholder="First Name"
//             name="firstname"
//             className="infoInput"
//           />
//           <input
//             value={formData.lastname}
//             onChange={handleChange}
//             type="text"
//             placeholder="Last Name"
//             name="lastname"
//             className="infoInput"
//           />
//         </div>

//         <div>
//           <input
//             value={formData.worksAt}
//             onChange={handleChange}
//             type="text"
//             placeholder="Works at"
//             name="worksAt"
//             className="infoInput"
//           />
//         </div>

//         <div>
//           <input
//             value={formData.livesIn}
//             onChange={handleChange}
//             type="text"
//             placeholder="Lives in"
//             name="livesIn"
//             className="infoInput"
//           />
//           <input
//             value={formData.country}
//             onChange={handleChange}
//             type="text"
//             placeholder="Country"
//             name="country"
//             className="infoInput"
//           />
//         </div>

//         <div>
//           <input
//             value={formData.relationship}
//             onChange={handleChange}
//             type="text"
//             className="infoInput"
//             placeholder="Relationship status"
//             name="relationship"
//           />
//         </div>

//         <div>
//           Profile image
//           <input type="file" name="profileImage" onChange={onImageChange} />
//           Cover image
//           <input type="file" name="coverImage" onChange={onImageChange} />
//         </div>

//         <button className="button infoButton"  type="submit">
//           Update
//         </button>
//       </form>
//     </Modal>
//   );
// };

// export default ProfileModal;
