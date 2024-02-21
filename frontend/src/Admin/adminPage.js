import React, { Fragment, useEffect, useState } from 'react'  
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DocuList from '../Components/Admin/DocuList';
import NewDocu2 from '../Components/Admin/NewDocu2';
import ProcessList from '../Components/Admin/processList';
import NewProcessList from '../Components/Admin/NewProcess1';
import Nav from './nav';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import UIkit from 'uikit';

const openModal = () => {
 const modal = UIkit.modal("#modal-center");
  if (modal) {
    modal.show();
  }
};


const AdminPage = () => {

  return (
    <Fragment>
       <Nav/>
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

    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box">
        <button className="uk-button" onClick={() => openModal()}>
            add
         </button>
         <div id="modal-center" className="uk-flex-top" uk-modal="true">
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button className="uk-modal-close-default" type="button" uk-close></button>
            <div className="scroll-container">
            <NewProcessList/>
            </div>
        </div>
      </div>
       <ProcessList/>
        </article>
    </div>

    <div class="tile is-parent">
          <article class="tile is-child box">
         
          </article>
        </div>
    </div>

    </Fragment>
   
    )
}

export default AdminPage