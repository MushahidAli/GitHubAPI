import axios from 'axios';
const Search = () => {
    var searchData = [];
    async function check() {
        searchData = [];
        var githubsearch = document.getElementById('githubsearch').value;
        if(githubsearch) {
            await axios.get('https://api.github.com/search/repositories?q='+githubsearch)
            .then(res => searchData.push((res.data)))  //console.log(searchData[0].items[0].full_name)
            .catch(error => console.log(error))

            if(searchData[0].total_count > 0) {
                document.getElementById('search-container').style.display = 'block';
                document.getElementById('repocontainer').innerHTML = '';
                if(searchData[0].total_count >= 30) {document.getElementById('formore').innerHTML = `For More, <a target='_blank' href='https://github.com/search?p=4&type=Repositories&q=${githubsearch}'>click me!</a>`;}
                for(let i=0; i<searchData[0].total_count; i++) {
                    document.getElementById('reporesults').innerHTML = `A total of ${searchData[0].total_count} repository results`;
                    document.getElementById('repocontainer').innerHTML += `<br> <img width='100px' style='border-radius:50px' height='100px' src='${searchData[0].items[i].owner.avatar_url}' /> <br> UserName/Repo : <a target='_blank' href='https://github.com/${searchData[0].items[i].full_name}'>${searchData[0].items[i].full_name}</a> <br> Description: ${searchData[0].items[i].description} <br> Star: ${searchData[0].items[i].stargazers_count} | Fork: ${searchData[0].items[i].forks_count} | Language: ${searchData[0].items[i].language} <br> Created: ${searchData[0].items[i].created_at}<br>Updated: ${searchData[0].items[i].updated_at}<hr>`;
                }
                }
            else {
                document.getElementById('reporesults').innerHTML = `A total of ${searchData[0].total_count} repository results`;
                document.getElementById('repocontainer').innerHTML = 'Try entering a valid repository name!';
                document.getElementById('formore').innerHTML = '';
                searchData = [];
            }
            
        }
        else {
            document.getElementById('search-container').style.display = 'none';
            alert('Enter A Valid Name!');
        }
    }

    return(<>
    <br />
    <div style={{color: 'black', border: '1px solid grey', borderRadius: '5px', backgroundColor: '#D3D3D3'}}>
    <br />GitHub Repository:<br /><br />
        <input style={{border: '0', padding: '10px', borderRadius: '5px', borderLeft: '3px solid green', backgroundColor: 'black', color: 'white'}} id="githubsearch" type="text" placeholder="RepositoryName" /><br /><br />
        <button onClick={check}>Check!</button><br /><br />
        <div style={{display: 'none'}} id="search-container"><fieldset>
        <div id="reporesults"></div>
        <fieldset><div id="repocontainer"></div><div id='formore'></div></fieldset>
        </fieldset></div>
    </div>
    </>);
}

export default Search;