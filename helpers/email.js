


import nodemailer from 'nodemailer';

export const enviarCorreoRecuperacion = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'proyectofinalsena@gmail.com', 
      pass: 'aialhcdgvjgmbayj',       
    },
  });

  const mailOptions = {
    from: 'proyectofinalsena@gmail.com', 
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Utiliza el siguiente enlace para restablecer tu contraseña: https://localhost:4500/Rescontrasena?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
};
