import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* TOPO FIXO */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-paroquia-primary to-paroquia-dark shadow-[0_4px_10px_rgba(0,0,0,0.6)] py-4 px-2 text-center">
        <div className="flex justify-center items-center gap-4 relative">
          <img
            src="/img/logo/logo.png"
            alt="Logo Paróquia"
            className="w-14 h-14 rounded-full border-2 border-paroquia-gold object-cover"
          />
          <h1 className="text-2xl md:text-3xl m-0">Paróquia Santa Quitéria</h1>

          {/* HAMBÚRGUER MOBILE */}
          <button
            className="absolute right-4 md:hidden text-paroquia-gold hover:text-white transition-colors"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* NAVEGAÇÃO DESKTOP & MOBILE */}
        <nav
          className={`
          mt-4 md:flex md:justify-center md:items-center md:flex-wrap
          ${
            isMenuOpen
              ? "flex flex-col bg-gradient-to-b from-paroquia-primary/95 to-paroquia-dark/95 rounded-2xl p-4 shadow-2xl animate-[menuFade_0.4s_ease_forwards]"
              : "hidden"
          }
        `}
        >
          {/* Usamos <a> para links de âncora na Home e <Link> para outras páginas */}
          <a href="/#sobre" onClick={closeMenu} className="nav-link">
            Sobre
          </a>
          <a href="/#horarios" onClick={closeMenu} className="nav-link">
            Missas
          </a>
          <a href="/#doacao" onClick={closeMenu} className="nav-link">
            Doação
          </a>
          <a href="/#calendario" onClick={closeMenu} className="nav-link">
            Calendário
          </a>
          <Link to="/liturgia" onClick={closeMenu} className="nav-link">
            Liturgia Diária
          </Link>
          <Link to="/sacramentos" onClick={closeMenu} className="nav-link">
            Batismos | Casamentos
          </Link>
          <Link to="/comunidades" onClick={closeMenu} className="nav-link">
            Comunidades
          </Link>

          <Link to="/eventos" onClick={closeMenu} className="nav-link">
            Eventos
          </Link>
        </nav>
      </header>

      {/* Espaçador para o header fixo não cobrir o conteúdo (170px equivalente ao CSS antigo) */}
      <div className="pt-[170px]" />

      {/* CONTEÚDO PRINCIPAL (Renderiza as páginas filhas) */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5">
        <Outlet />
      </main>

      {/* RODAPÉ */}
      <footer className="text-center p-5 bg-black/80 text-sm text-gray-300 mt-12">
        © 2026 Paróquia Santa Quitéria, Estrada do Lageado, 1206 • Desenvolvido
        por: Jonatas Sousa Monteiro e Pedro Alves
      </footer>

      {/* Estilos específicos locais (se precisar) */}
      <style>{`
        .nav-link {
          color: #d4af37;
          margin: 0 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: 0.3s;
          padding: 10px 0;
        }
        @media (max-width: 768px) {
          .nav-link {
            border-bottom: 1px solid rgba(212,175,55,0.15);
            font-size: 1.05rem;
          }
          .nav-link:last-child {
            border-bottom: none;
          }
        }
        .nav-link:hover {
          color: #fff;
          background: rgba(212,175,55,0.12);
        }
        @keyframes menuFade {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
