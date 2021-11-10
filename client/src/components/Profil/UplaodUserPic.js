import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadUserPic } from '../../actions/user.action';

export default function UploadUserPic() {

    const [file, setFile] = useState();

    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handlePic = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("username", userData.username);
        data.append("userId", userData._id);
        data.append("file", file);

        dispatch(uploadUserPic(data, userData._id));
    }

    return (
        <div className='uploadPic'>
            <form action="" onSubmit={handlePic}>
                <label className="file">
                    <input type="file" id="file" accept='.jpg, .jpeg, .png' onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <br />
                <input type="submit" value="Changer" />
            </form>
        </div>
    )
}
