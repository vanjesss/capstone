// src/pages/LandingPageLoggedIn.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoWarningOutline,
  IoInformationCircleOutline,
  IoStatsChartOutline,
  IoArrowForwardOutline,
  IoSearchOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

import Carousel from "../../components/Carousel";

// images / logos
import K3TeamLogoDark from "../../assets/images/logo-k3team-dark.png";
import K3WorkerImage from "../../assets/images/logo-k3-worker-small.png";
import K3TeamLogoWhite from "../../assets/images/logo secondary k3team.png";

import Artikel1 from "../../assets/images/artikel1.png";
import Artikel2 from "../../assets/images/artikel2.png";
import Artikel3 from "../../assets/images/artikel3.png";

import "../../styles/LandingPageLoggedIn.css";

const NavbarLoggedIn = ({ userName = "User" }) => {
  return (
    <header className="nav-logged-wrapper">
      <div className="nav-inner">
        <div className="nav-left">
          <img src={K3TeamLogoDark} alt="K3Team" className="nav-logo" />
        </div>

        <nav className="nav-center" aria-label="main navigation">
          <ul className="nav-links">
            <li className="nav-link active">Beranda</li>
            <li className="nav-link">Pengaduan</li>
            <li className="nav-link">Informasi</li>
            <li className="nav-link">Data Statistik</li>
            <li className="nav-link">Berita</li>
          </ul>
        </nav>

        <div className="nav-right">
          <div className="search-box">
            <IoSearchOutline className="search-icon" />
            <input className="search-input" placeholder="Cari informasi" />
          </div>

          <button className="notif-btn" title="Notifikasi">
            <IoNotificationsOutline />
          </button>

          <button className="profile-btn" title="Profile">
            {/* If you have profile image, replace with <img src={profileImage} /> */}
            <span className="profile-initial"> {userName?.[0] || "U"} </span>
          </button>
        </div>
      </div>
    </header>
  );
};

// service card (reuse style from landingpage original)
const ServiceCard = ({ icon: Icon, title, description, linkText }) => (
  <div className="service-card">
    <div className="service-icon"><Icon size={28} /></div>
    <h3 className="service-title">{title}</h3>
    <p className="service-desc">{description}</p>
    <Link to="/pengaduan" className="service-link">
      {linkText} <IoArrowForwardOutline />
    </Link>
  </div>
);

// berita card (with image)
const BeritaCard = ({ img, tag, title, date, link }) => (
  <article className="berita-card-logged">
    <span className={`berita-tag tag-${tag.toLowerCase()}`}>{tag}</span>
    <div className="berita-image-wrapper-logged">
      <img src={img} alt={title} className="berita-img-logged" />
    </div>
    <div className="berita-body-logged">
      <h4 className="berita-title-logged">{title}</h4>
      <p className="berita-date-logged">{date}</p>
      <Link to={link} className="berita-more-logged">Selengkapnya <IoArrowForwardOutline /></Link>
    </div>
  </article>
);

// Form laporan (right card)
function LaporanFormCard() {
  const [form, setForm] = useState({
    nama: "",
    jenis: "",
    lokasi: "",
    detail: "",
    kontak: ""
  });

  const [files, setFiles] = useState([]);

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).slice(0, 5);
    setFiles(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: integrate with API
    console.log("submit form", form, files);
    alert("Laporan terkirim (dummy).");
    // clear form
    setForm({ nama: "", jenis: "", lokasi: "", detail: "", kontak: "" });
    setFiles([]);
  };

  return (
    <div className="laporan-card">
      <form onSubmit={handleSubmit}>
        <h3 className="laporan-title">Buat Laporan</h3>

        <label className="lbl">Nama Lengkap</label>
        <input name="nama" value={form.nama} onChange={onChange} placeholder="Masukkan nama lengkap" className="input" />

        <label className="lbl">Jenis Laporan</label>
        <div className="select-wrapper">
          <select name="jenis" value={form.jenis} onChange={onChange} className="select">
            <option value="">Pilih jenis laporan</option>
            <option value="Insiden">Insiden</option>
            <option value="Near Miss">Hampir Celaka</option>
            <option value="Observasi">Observasi K3</option>
          </select>
          <span className="chev">▾</span>
        </div>

        <label className="lbl">Lokasi Kejadian</label>
        <input name="lokasi" value={form.lokasi} onChange={onChange} placeholder="Lokasi kejadian" className="input" />

        <label className="lbl">Detail Laporan</label>
        <textarea name="detail" value={form.detail} onChange={onChange} placeholder="Jelaskan kronologi dan detail kejadian..." className="textarea" rows="6" />

        <label className="lbl">Upload Bukti</label>
        <label className="upload-dashed">
          <div className="upload-inner">
            <div className="upload-icon">📁</div>
            <div>
              <div className="upload-text-1">Klik untuk upload foto/dokumen</div>
              <div className="upload-text-2">PNG, JPG, PDF (Max 5MB)</div>
            </div>
          </div>
          <input type="file" accept=".png,.jpg,.jpeg,.pdf" multiple onChange={handleFileChange} className="input-file" />
        </label>

        <label className="lbl">Kontak</label>
        <input name="kontak" value={form.kontak} onChange={onChange} placeholder="Email atau nomor telepon" className="input" />
        <div className="hint">Untuk pembaruan status laporan Anda</div>

        <div className="submit-area">
          <button type="submit" className="btn-submit">Kirim Laporan</button>
          <div className="submit-note">Laporan akan ditindaklanjuti dalam 1x24 jam</div>
        </div>
      </form>
    </div>
  );
}

export default function LandingPageLoggedIn() {
  return (
    <div className="page-logged-root">
      <NavbarLoggedIn userName="Aditya" />

      <main className="page-content">
        {/* Hero + quick actions */}
        <section className="hero-logged">
          <div className="hero-left">
            <h1 className="hero-title-logged">
              Utamakan <span className="hl">Keselamatan</span>, <br /> Jaga Keberlanjutan!
            </h1>
            <p className="hero-sub-logged">
              Sumber resmi peraturan, panduan praktis, dan sistem pelaporan terpadu untuk memastikan lingkungan kerja yang aman dan produktif.
            </p>
            <div className="hero-buttons">
              <Link to="/informasi" className="btn-primary">Pelajari K3</Link>
              <Link to="/pengaduan" className="btn-secondary">Laporkan Insiden <IoArrowForwardOutline /></Link>
            </div>
          </div>
          <div className="hero-right">
            <img src={K3WorkerImage} alt="worker" className="hero-worker-img" />
          </div>
        </section>

        {/* Services */}
        <section className="services-logged">
          <ServiceCard icon={IoWarningOutline} title="Pengaduan Insiden" description="Laporkan insiden atau potensi bahaya dengan cepat." linkText="Selengkapnya" />
          <ServiceCard icon={IoInformationCircleOutline} title="Informasi" description="Akses SOP, JSA, dan panduan K3." linkText="Selengkapnya" />
          <ServiceCard icon={IoStatsChartOutline} title="Data Statistik" description="Pantau data K3 secara realtime." linkText="Selengkapnya" />
        </section>

        {/* Carousel */}
        <div className="carousel-section">
          <Carousel />
        </div>

        {/* Statistik */}
        <section className="statistics-logged">
          <h2>Data Statistik K3</h2>
          <div className="stats-grid">
            <div className="stat"> <div className="stat-value">15%</div> <div className="stat-label">Penurunan Kecelakaan</div> </div>
            <div className="stat"> <div className="stat-value">200</div> <div className="stat-label">Total Pendaftar</div> </div>
            <div className="stat"> <div className="stat-value">96%</div> <div className="stat-label">Tingkat Kepatuhan</div> </div>
            <div className="stat"> <div className="stat-value">3,847</div> <div className="stat-label">Personil Tersertifikasi</div> </div>
          </div>
        </section>

        {/* Laporan + Berita */}
        <section className="laporan-berita-section">
          <div className="laporan-left">
            <div className="badge">Sistem Laporan</div>
            <h3 className="laporan-heading">Laporan Pengaduan K3</h3>
            <p className="laporan-desc">
              Laporkan kondisi tidak aman, pelanggaran K3, atau kecelakaan kerja.
              Identitas pelapor dijamin kerahasiaannya. Laporan Anda membantu menciptakan lingkungan kerja yang lebih aman untuk semua.
            </p>

            <div className="info-tiles">
              <div className="info-tile">
                <div className="info-icon">🔒</div>
                <div className="info-text">
                  <div className="info-title">Anonim & Aman</div>
                  <div className="info-sub">Identitas pelapor terlindungi</div>
                </div>
              </div>

              <div className="info-tile">
                <div className="info-icon">📞</div>
                <div className="info-text">
                  <div className="info-title">Hotline 24/7</div>
                  <div className="info-sub">021-5555-K3K3 (5353)</div>
                </div>
              </div>

              <div className="info-tile">
                <div className="info-icon">✉️</div>
                <div className="info-text">
                  <div className="info-title">Email</div>
                  <div className="info-sub">lapor@k3teamindonesia.go.id</div>
                </div>
              </div>
            </div>
          </div>

          <div className="laporan-right">
            <LaporanFormCard />
          </div>
        </section>

        {/* Berita grid (below laporan) */}
        <section className="berita-logged-section">
          <div className="berita-header-logged">
            <h2>Berita Terkini</h2>
            <Link to="/berita" className="btn-lihat-all">Lihat Semua Berita <IoArrowForwardOutline /></Link>
          </div>

          <div className="berita-grid-logged">
            <BeritaCard img={Artikel1} tag="Investigasi" title="Peraturan UU Ketenagakerjaan: Apa Dampaknya?" date="28 Nov 2025" link="#" />
            <BeritaCard img={Artikel2} tag="Pendidikan" title="Simulasi Edukasi K3 untuk Pekerja Konstruksi" date="28 Nov 2025" link="#" />
            <BeritaCard img={Artikel3} tag="Investigasi" title="Review Kepatuhan Penggunaan APD" date="28 Nov 2025" link="#" />
          </div>
        </section>

      </main>

      {/* Footer — reuse simple footer */}
      <footer className="footer-logged">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src={K3WorkerImage} alt="worker" className="footer-worker" />
              <img src={K3TeamLogoWhite} alt="k3white" className="footer-text" />
            </div>
            <p className="footer-desc">
              Sistem terpadu untuk regulasi, pelatihan, pelaporan, dan data K3. Menciptakan tempat kerja yang aman & produktif.
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Layanan</h4>
            <ul>
              <li><a href="#pengaduan">Pengaduan</a></li>
              <li><a href="#data-statistik">Data Statistik</a></li>
              <li><a href="#berita">Berita</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>Kontak</h4>
            <p>Jl. Jend. Sudirman No. 12</p>
            <p>kontak@k3team.id</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
