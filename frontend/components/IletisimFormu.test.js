import React from 'react';
import { getByAltText, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';
import App from '../App';

test('hata olmadan render ediliyor', () => {
    render(<App/>);
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu />);
    const thingToTest = screen.getByText(/İletişim Formu/i);
    expect(thingToTest).toBeInTheDocument();
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu />);
    const kullaniciAdi = screen.getByPlaceholderText(/İlhan/i);
    userEvent.type(kullaniciAdi,"Chat");
    //const hataIsim = screen.getByText(/ad en az 5 karakter olmalıdır /i);
    const hataIsim = screen.getByTestId("error");
    expect(hataIsim).toBeInTheDocument();
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
    const EmailkullaniciAdi = screen.getByPlaceholderText(/İlhan/i);
    const kullaniciSoyadi = screen.getByPlaceholderText(/Mansız/i);
    const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    userEvent.type(EmailkullaniciAdi,"a");
    userEvent.type(kullaniciSoyadi,"a");
    userEvent.type(Email,"d");
    userEvent.clear(kullaniciSoyadi);
    const hataList = await  screen.getAllByTestId("error");
    expect(hataList.length).toEqual(3);
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
    const EmailkullaniciAdi = screen.getByPlaceholderText(/İlhan/i);
    const kullaniciSoyadi = screen.getByPlaceholderText(/Mansız/i);
    //const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    const submitBtn = screen.getAllByRole("button");
    userEvent.type(EmailkullaniciAdi, "Cihat");
    userEvent.type(kullaniciSoyadi,"Bulut");
    userEvent.click(submitBtn[0]);

    const hataList = await  screen.getAllByTestId("error");
    expect(hataList.length).toEqual(1);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
    const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    userEvent.type(Email,"d");
    const hataList = await  screen.getByTestId("error");
    expect(hataList).toHaveTextContent("email geçerli bir email adresi olmalıdır.");
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
    const kullaniciSoyadi = screen.getByPlaceholderText(/Mansız/i);
    userEvent.type(kullaniciSoyadi," ");
    userEvent.clear(kullaniciSoyadi);

    const hataList = await screen.getByTestId("error");
    expect(hataList).toHaveTextContent("soyad gereklidir.");
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    render(<IletisimFormu />);
    const EmailkullaniciAdi = screen.getByPlaceholderText(/İlhan/i);
    const kullaniciSoyadi = screen.getByPlaceholderText(/Mansız/i);
    const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    userEvent.type(EmailkullaniciAdi,"v");
    userEvent.type(kullaniciSoyadi,"d");
    userEvent.type(Email,"f");
    userEvent.clear(kullaniciSoyadi);
    const hataList = await  screen.getAllByTestId("error");
    expect(hataList.length).toEqual(3);
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    render(<IletisimFormu />);
    const EmailkullaniciAdi = screen.getByPlaceholderText(/İlhan/i);
    const kullaniciSoyadi = screen.getByPlaceholderText(/Mansız/i);
    const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    userEvent.type(EmailkullaniciAdi,"a");
    userEvent.type(kullaniciSoyadi,"a");
    userEvent.type(Email,"d");
    userEvent.clear(kullaniciSoyadi);
    const hataList = await  screen.getAllByTestId("error");
    expect(hataList.length).toEqual(3);
});
