import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './TicketModal.css';

Modal.setAppElement('#root');

function TicketModal({ isOpen, onRequestClose, onSave, ticket }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [ticket, isOpen]);

  const handleSave = () => {
    onSave({ ...ticket, title, description });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ticket Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{ticket ? 'Edit Ticket' : 'Add Ticket'}</h2>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="form-actions">
          <button type="button" onClick={handleSave} className="btn-save">Save</button>
          <button type="button" onClick={onRequestClose} className="btn-cancel">Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

export default TicketModal;
