// import React, { Fragment, useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { MDBDataTable } from 'mdbreact'
// import axios from 'axios'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Sidebar from '../Sidebar'
// import MetaData from '../../Layout/MetaData'
// // import Sidebar from './SideBar'
// import { getToken } from '../../../utils/helpers';
// import Loader from '../../Layout/Loader'
// import { FaRegMehBlank } from 'react-icons/fa';
// // ... (your existing imports)

// const HomepageList = () => {
//     const [peanutshells, setPeanutShells] = useState([]);
//     const [error, setError] = useState('');
//     const [deleteError, setDeleteError] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [isDeleted, setIsDeleted] = useState(false);
//     const [selectedPeanutShells, setSelectedPeanutShells] = useState([]);

//     let navigate = useNavigate();

//     const togglePeanutShellsSelection = (id) => {
//         const isSelected = selectedPeanutShells.includes(id);
//         if (isSelected) {
//             setSelectedPeanutShells(selectedPeanutShells.filter((selectedId) => selectedId !== id));
//         } else {
//             setSelectedPeanutShells([...selectedPeanutShells, id]);
//         }
//     };

   
//     const getAdminPeanutShells = async () => {
//          try {
//             // const config = {
//             //     headers: {
//             //         'Content-Type': 'multipart/form-data',
//             //         'Authorization': `Bearer ${getToken()}`
//             //     }
//             // };

//             const { data } = await axios.get(`http://localhost:3001/api/v1/`);

//             console.log(data);
//             setPeanutShells(data.peanutshell);
//             setLoading(false);
//         } catch (error) {
//             setError(error.response.data.message);
//         }
//     };


//     useEffect(() => {
//         getAdminPeanutShells();

//         if (error) {
//             toast.error(error, {
//                 position: toast.POSITION.BOTTOM_RIGHT
//             });
//         }

//         if (deleteError) {
//             toast.error(deleteError, {
//                 position: toast.POSITION.BOTTOM_RIGHT
//             });
//         }

//         if (isDeleted) {

//             toast.success('DESCRIPTION DELETED SUCCESSFULLY', {
//                 position: toast.POSITION.BOTTOM_RIGHT
//             });

//             navigate('/admin/peanutshellList');
//             setIsDeleted(false);
//             setDeleteError('');
//         }
//     }, [error, deleteError, isDeleted]);


//     const toggleAllPeanutShellsSelection = () => {
//         if (selectedPeanutShells.length === peanutshells.length) {
//             // If all materials are selected, unselect all
//             setSelectedPeanutShells([]);
//         } else {
//             // Otherwise, select all materials
//             setSelectedPeanutShells(peanutshells.map((peanutshells) => peanutshells._id));
//         }
//     };

    
//     const deleteTopic = async (id) => {
//         try {
//             // const config = {
//             //     headers: {
//             //         'Content-Type': 'multipart/form-data',
//             //         'Authorization': `Bearer ${getToken()}`
//             //     }
//             // };
//             const { data } = await axios.delete(`http://localhost:3001/api/v1/home/topic/${id}`);

//             setIsDeleted(data.success);
//             setLoading(false);
//         } catch (error) {
//             setDeleteError(error.response.data.message);
//         }
//     };

//     const peanutshellList = () => {
//         const data = {
//             columns: [
//                 {
//                     label: (      <input
//                         type="checkbox"
//                         checked={selectedPeanutShells.length === peanutshells.length}
//                         onChange={toggleAllPeanutShellsSelection}
//                     />
//                     ),
//                               label: (      <input
//                                         type="checkbox"
//                                         checked={selectedPeanutShells.length === peanutshells.length}
//                                         onChange={togglePeanutShellsSelection}
//                                     />
//                                 ),
//                                     field: 'select',
//                                     sort: 'asc',
//                                 },
//                                 {
//                                     label: 'PEANUT SHELL ID',
//                                     field: 'id',
//                                     sort: 'asc'
//                                 },
//                                 {
//                                     label: 'DESCRIPTION',
//                                     field: 'description',
//                                     sort: 'asc'
//                                 },
//                                 {
//                                     label: 'Actions',
//                                     field: 'actions',
//                                 },
//                             ],
//                             rows: []
//                         };
                
//                         materials.forEach(material => {
//                             data.rows.push({
//                                 select: (
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedPeanutShells.includes(material._id)}
//                                         onChange={() => togglePeanutShellsSelection(material._id)}
//                                     />
//                                 ),
//                                 id: material._id,
//                                 images: material.images.map((image, index) => (
//                                     <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
//                                 )),
//                                 name: material.name,
//                                 stock: material.stock,
//                                 actions: <Fragment>
//                                         <Link to={`/admin/updatehome/${material._id}`} className="btn btn-primary py-1 px-2">
//                                             <i className="fa fa-pen"></i>
//                                         </Link>
//                                         <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteMaterialHandler(material._id)}>
//                                             <i className="fa fa-trash"></i>
//                                         </button>
//                                     </Fragment>
                                
//                             });
//                         });
                
//                         return data;
//                     };
                

//     const deleteTopicHandler = (id) => {
//         deleteMaterial(id);
//     };



//     const deleteTopicHandler2 = async () => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${getToken()}`
//                 }
//             };

//             // Send a request to delete multiple materials
//             const deleteRequests = selectedPeanutShells.map(async (id) => {
//               return axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/Process/${id}`);
//             });

//             // Wait for all delete requests to complete
//             const responses = await Promise.all(deleteRequests);

//             // Check if all requests were successful
//             const allSuccess = responses.every((response) => response.data.success);

//             setIsDeleted(allSuccess);
//             setLoading(false);
//         } catch (error) {
//             setDeleteError(error.response.data.message);
//         }
//     };

//     return (

//         <Fragment>
//         <MetaData title={'All Materials'} />
//         <div className="row">
//             <div className="col-12 col-md-2"style={{  marginBottom: "2px" }}>
//                 <div style={{  height: '100vh', overflow: 'scroll initial' }}>
//                     <Sidebar />
//                 </div>
//             </div>
//             <div className="col-12 col-md-10" style={{  paddingLeft: "70px", marginBottom: "70px" }}>
//                 <Fragment>
//                         <h1 className="my-5">LIST OF ALL HOMEPAGE</h1>
//                         {loading ? (
//                             <Loader />
//                         ) : (
//                             <div>
//                             <div>
//                                 <button
//                                     className="btn btn-danger py-1 px-2 mb-2"
//                                     onClick={deleteTopicHandler2}
//                                     disabled={selectedPeanutShells.length === 0}
//                                 >
//                                     Delete Selected
//                                 </button>
//                             </div>
//                             <MDBDataTable data={peanutshellList()} className="px-3" bordered striped hover />
                    
//                         </div>
//                     )}
//                     </Fragment>
//                 </div>
//             </div>
//     </Fragment>
//     );
// };

// export default HomepageList;
