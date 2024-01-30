import Image from 'next/image';
import * as React from 'react';

interface IContactProps {
}

const Contact: React.FunctionComponent<IContactProps> = (props) => {
  return (
    <div className='mb-20 relative'>
      <div className='h-[400px] bg-cover brightness-75' style={{ backgroundImage: 'url(/assets/banners.jpg)' }}>
      </div>
      <div className='max-w-[1000px] mx-auto translate-y-[-200px]'>
        <div className='flex flex-col sm:flex-row  gap-20  p-5 bg-white border-[1px] shadow-xl rounded-lg m-5'>
          <div className='max-w-[400px]'>
            <h1 className='text-2xl font-bold text-primary-700'>Our Contact</h1>
            <div className='mt-5'>
              <h4 className='font-semibold'>Address</h4>
              <p className='text-gray-500'>59VX+96G, Rejowinangun, Kec. Kotagede, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55171</p>
            </div>
            <div className='mt-5 '>
              <h4 className='font-semibold'>Email</h4>
              <p className='text-gray-500'>kebunraya@gmail.com</p>
            </div>
            <div className='mt-5'>
              <h4 className='font-semibold'>Phone</h4>
              <p className='text-gray-500'>0812312312321</p>
            </div>
          </div>
          <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15811.367814390955!2d110.3980631!3d-7.8065504!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57f2a1786fc5%3A0x16aa264fc99a3164!2zVG9rbyBLZWJ1biBSYXlhIOqni-qmoOqmuuqmtOqmj-qmuuqmtOqmj-qmvOqmp-qmuOqmpOqngOqmq-qmqg!5e0!3m2!1sid!2sid!4v1706603178122!5m2!1sid!2sid" className='w-[340px] lg:w-[600px] h-[340px] sm:h-[450px]' loading="lazy"></iframe>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
