import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Contact() {

  return (
    <div>
      <Header />
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>Felipe Nascimeto</th>
            <th>Lucas Zaggo</th>
            <th>Luiz Fernandes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GitHub</td>
            <td>https://github.com/flpnascto</td>
            <td>https://github.com/luc-zago</td>
            <td>https://github.com/LuizFernandesOliveira</td>
          </tr>
          <tr>
            <td>Linkedin</td>
            <td>linkedin.com/in/fnascto</td>
            <td>linkedin.com/in/lucas-zago-de-oliveira</td>
            <td>linkedin.com/in/luizfernandesoliveiraoficial</td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td>flpnascto@gmail.com</td>
            <td>luc.zago@hotmail.com</td>
            <td>luizfernandesoliveiraoficial@gmail.com</td>
          </tr>
        </tbody>

      </table>
      <Footer />

    </div>
  );
}

