import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Body from './Body'
import Search from './Search'
import FileNotFound from './FileNotFound'

const Header = () => {
    return (<>
    <div style={{border: '1px solid black', backgroundColor: 'black', color: 'white', borderRadius: '10px'}}>
    <a href="/"><img src="https://raw.githubusercontent.com/MushahidAli/GitHubAPI/main/imgs/logo.png" width="100px" height="100px" style={{borderRadius: '50px'}} /></a>
    <h1>Mushahid's GitHub API</h1>
    <BrowserRouter>
    [<Link to="/">Search UserName</Link>] :
    [<Link to="/search">Search Repositories</Link>] :
    [<a target="_blank" href="https://github.com/MushahidAli/GitHubAPI">Source Code Link</a>]
      <Routes>
         <Route path="/" element={<Body />} />
         <Route path="/search" element={<Search />} />
         <Route path="*" element={<FileNotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
    </>);
}

export default Header;
