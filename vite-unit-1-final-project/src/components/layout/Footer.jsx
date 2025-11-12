const Footer = () => {
    let thisYear = new Date().getFullYear();

    return (
        <footer>
            <div>&copy; {thisYear} Bessie's Table</div>
        </footer>
    );
};
  
export default Footer;

