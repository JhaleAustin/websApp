import React, { Fragment, useEffect, useState } from 'react'  
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DocuList from '../Components/Admin/DocuList';
import NewDocu2 from '../Components/Admin/NewDocu2';

const AdminPage = () => {

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box">
       <NewDocu2/>
        </article>
    </div>

    <div class="tile is-parent">
          <article class="tile is-child box">
          <DocuList/>
          </article>
        </div>
    </div>
    )
}

export default AdminPage