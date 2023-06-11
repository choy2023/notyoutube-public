import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeHelper } from "../data/helpOpenReducer";

import './help.css';

const Help = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state:any) => state.helperOpen.isOpen);

  const handleCancel = () => {
    dispatch(closeHelper());
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label htmlFor="subject">Subject:</label>
      <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />

      <label htmlFor="message">Message:</label>
      <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />

      <input type="submit" value="Send" /> */}
    </form>
  );
}

export default Help;
