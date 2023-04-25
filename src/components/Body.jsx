import axios from 'axios'

const Body = () => {
    var input = document.getElementById("github-id");
input.addEventListener("keypress", function(event) {
  alert("First "+event.key);
  if (event.key === "Enter") {
    alert("Second "+event.key);
  }
});
    var users = [];
    var repolist = [];
    async function check() {
        users = [];
        repolist = [];
        document.getElementById('repolist').innerHTML = "";
        document.getElementById('name').innerHTML = "";
        document.getElementById('photo').innerHTML = "";
        document.getElementById('bio').innerHTML = "";
        document.getElementById('followers').innerHTML = "";
        document.getElementById('following').innerHTML = "";
        document.getElementById('repo').innerHTML = "";
        document.getElementById('link').innerHTML = "";
        var githubid = document.getElementById('github-id').value;
        if(githubid) {            
            await axios.get('https://api.github.com/users/'+githubid)
            .then(res => users.push(res))
            .catch(error => 
                document.getElementById('profile').style.display = 'none'
            )
            await axios.get('https://api.github.com/users/'+githubid+'/repos')
            .then(result => repolist.push(result))
            setTimeout(() => {
            document.getElementById('profile').style.display = 'block';
            document.getElementById('name').innerHTML = JSON.stringify(users["0"].data.name);
            if(JSON.stringify(users["0"].data.name) == "null") {
                document.getElementById('name').innerHTML = "No Name found!";
            }
            document.getElementById('photo').innerHTML = `<img src=${JSON.stringify(users["0"].data.avatar_url)} width="200px" height="200px" style="border-radius:100px">`;
            document.getElementById('bio').innerHTML = JSON.stringify(users["0"].data.bio);
            if(JSON.stringify(users["0"].data.bio) == "null") {
                document.getElementById('bio').innerHTML = "No BIO content found!";
            }
            document.getElementById('repo').innerHTML = JSON.stringify(users["0"].data.public_repos);
            document.getElementById('link').innerHTML = `<a target="_blank" href="https://github.com/${githubid}">&lt;Link To GitHub Profile /&gt;</a>`;
            document.getElementById('followers').innerHTML = JSON.stringify(users["0"].data.followers);
            document.getElementById('following').innerHTML = JSON.stringify(users["0"].data.following);
            if(JSON.stringify(users["0"].data.public_repos) > 0) {
                document.getElementById('fieldset-container').style.display = 'display';
                for(let i=0; i<JSON.stringify(users["0"].data.public_repos); i++) {
                    document.getElementById('repolist').innerHTML += `<br><fieldset>Name: ${JSON.stringify(repolist['0'].data[i].name)} <br /> Description: ${JSON.stringify(repolist['0'].data[i].description)} <br /> Stars: ${repolist['0'].data[i].stargazers_count} <br /> Language Used: ${JSON.stringify(repolist['0'].data[i].language)} <br /> <a target='_blank' href='https://github.com/${JSON.stringify(repolist['0'].data[i].full_name).replace(/['"]/g, '')}'>&lt;Link To Code Base /&gt;</a></fieldset>`;
                }
                }
            else {document.getElementById('fieldset-container').style.display = 'none';}
            },1500)
    }
        else {alert("Enter A Valid Name!");
        document.getElementById('profile').style.display = 'none';
    }
    }
    

    return(<><div style={{color: 'black', border: '1px solid grey', borderRadius: '5px', backgroundColor: '#D3D3D3'}}>
        <br />GitHub UserName:<br /><br />
        <input style={{border: '0', padding: '10px', borderRadius: '5px', borderLeft: '3px solid green', backgroundColor: 'black', color: 'white'}} id="github-id" placeholder="UserName" /><br /><br />
        <button onClick={check}>Check!</button><br /><br />
        <div id="profile" style={{display: 'none'}}><h4>Profile</h4>
        Name: <span id="name"></span><br />
        Photo:<br/> <div id="photo"></div>
        Bio:<br /> <span id="bio"></span><br />
        Followers: <span id="followers"></span> | Following: <span id="following"></span><br />
        No Of Repositories: <span id="repo"></span><br />
        <div id="link"></div>
        <div id="fieldset-container"><fieldset>Repositories As Follows:<br />
        <span id="repolist"></span><br />
        </fieldset></div>
        <br /><br />
        </div>
    </div></>);
}

export default Body;
