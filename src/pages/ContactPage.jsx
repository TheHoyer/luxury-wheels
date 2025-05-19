// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './ContactPage.module.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Imię musi mieć co najmniej 2 znaki." }),
  email: z.string().email({ message: "Podaj poprawny adres e-mail." }),
  subject: z.string().min(5, { message: "Temat musi mieć co najmniej 5 znaków." }),
  message: z.string().min(10, { message: "Wiadomość musi mieć co najmniej 10 znaków." })
});

function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(contactSchema), defaultValues: { name: '', email: '', subject: '', message: '' } });

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Dane formularza:", data);
      toast.success("Dziękujemy za wiadomość! Skontaktujemy się wkrótce.", { position: "bottom-right" });
      reset();
    } catch (error) {
      console.error("Błąd wysyłania:", error);
      toast.error("Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.", { position: "bottom-right" });
    }
  };

  const mapEmbedCode = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.779777776508!2d21.01017101579661!3d52.22967567976017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f61%3A0x7e244741f6bdb6f6!2sPalace%20of%20Culture%20and%20Science!5e0!3m2!1sen!2spl!4v1678886400000!5m2!1sen!2spl" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  return (
    <div className={styles.contactPage}>
      <section className={styles.titleSection}>
        <div className="container">
          <h1 className={styles.pageTitle}>Skontaktuj się z Nami</h1>
          <p className={styles.pageSubtitle}>Masz pytania lub chcesz dokonać rezerwacji? Wypełnij formularz lub zadzwoń!</p>
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <div className={styles.contactInfo}>
              <h2 className={styles.subTitle}>Dane Kontaktowe</h2>
              <div className={styles.infoItem}>
                <FaMapMarkerAlt className={styles.infoIcon}/>
                <div><strong>Adres:</strong><br/>ul. Luksusowa 1<br/>00-001 Warszawa</div>
              </div>
              <div className={styles.infoItem}>
                <FaPhoneAlt className={styles.infoIcon}/>
                <div><strong>Telefon:</strong><br/><a href="tel:+48123456789">+48 123 456 789</a></div>
              </div>
              <div className={styles.infoItem}>
                <FaEnvelope className={styles.infoIcon}/>
                <div><strong>E-mail:</strong><br/><a href="mailto:kontakt@luxurywheels.pl">kontakt@luxurywheels.pl</a></div>
              </div>
              <h3 className={styles.workingHoursTitle}>Godziny Otwarcia</h3>
              <p>Poniedziałek - Piątek: 9:00 - 18:00</p>
              <p>Sobota: 10:00 - 15:00</p>
              <p>Niedziela: Kontakt telefoniczny</p>
            </div>
            <div className={styles.contactFormWrapper}>
              <h2 className={styles.subTitle}>Formularz Kontaktowy</h2>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm} noValidate>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Imię i Nazwisko</label>
                  <input type="text" id="name" {...register("name")} className={`${styles.formInput} ${errors.name?styles.inputError:''}`} aria-invalid={errors.name?"true":"false"} />
                  {errors.name&&<p role="alert" className={styles.errorMessage}>{errors.name.message}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Adres E-mail</label>
                  <input type="email" id="email" {...register("email")} className={`${styles.formInput} ${errors.email?styles.inputError:''}`} aria-invalid={errors.email?"true":"false"} />
                  {errors.email&&<p role="alert" className={styles.errorMessage}>{errors.email.message}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Temat</label>
                  <input type="text" id="subject" {...register("subject")} className={`${styles.formInput} ${errors.subject?styles.inputError:''}`} aria-invalid={errors.subject?"true":"false"} />
                  {errors.subject&&<p role="alert" className={styles.errorMessage}>{errors.subject.message}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Wiadomość</label>
                  <textarea id="message" rows="6" {...register("message")} className={`${styles.formTextarea} ${errors.message?styles.inputError:''}`} aria-invalid={errors.message?"true":"false"} />
                  {errors.message&&<p role="alert" className={styles.errorMessage}>{errors.message.message}</p>}
                </div>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>{isSubmitting?<span className={styles.spinner}></span>:'Wyślij Wiadomość'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.mapSection}>
         <div dangerouslySetInnerHTML={{ __html: mapEmbedCode }} />
      </section>
    </div>
  );
}
export default ContactPage;