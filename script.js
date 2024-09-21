// Show project description on right-click
function showDescription(event, project, description) {
    event.preventDefault(); // Prevent default right-click behavior
    alert(`${project}: ${description}`);
}

// Add/Edit Python Projects dynamically
function addOrEditPythonProject() {
    const projectName = prompt("Enter project name:");
    const projectLink = prompt("Enter project link (URL):");
    const projectDesc = prompt("Enter project description:");
    
    if (projectName && projectLink && projectDesc) {
        const pythonProjectContainer = document.getElementById("python-projects").querySelector('.project-list');
        const newProjectButton = document.createElement("div");
        newProjectButton.classList.add("project-item");

        const projectButton = document.createElement("button");
        projectButton.classList.add("project-btn");
        projectButton.innerHTML = projectName;
        projectButton.onclick = () => window.open(projectLink, '_blank');
        projectButton.oncontextmenu = (e) => showDescription(e, projectName, projectDesc);

        newProjectButton.appendChild(projectButton);
        pythonProjectContainer.appendChild(newProjectButton);
    } else {
        alert("Project details incomplete!");
    }
}

// Add/Edit JavaScript Projects dynamically
function addOrEditProject() {
    const projectName = prompt("Enter project name:");
    const projectLink = prompt("Enter project link (URL):");
    const projectDesc = prompt("Enter project description:");
    
    if (projectName && projectLink && projectDesc) {
        // Create a new button dynamically for the JavaScript project
        const jsProjectContainer = document.getElementById("js-projects");
        const newProjectButton = document.createElement("button");
        newProjectButton.classList.add("project-btn");
        newProjectButton.innerHTML = projectName;

        // Left-click to open project link, right-click for description
        newProjectButton.onclick = () => window.open(projectLink, '_blank');
        newProjectButton.oncontextmenu = (e) => showDescription(e, projectName, projectDesc);

        // Append new button to the JavaScript projects section
        jsProjectContainer.appendChild(newProjectButton);

        // Optionally, store projects in session storage (temporary)
        let projects = JSON.parse(sessionStorage.getItem("jsProjects")) || [];
        projects.push({ name: projectName, link: projectLink, desc: projectDesc });
        sessionStorage.setItem("jsProjects", JSON.stringify(projects));
    } else {
        alert("Project details incomplete!");
    }
}

// Add/Edit Roadmap items
function addOrEditRoadmap() {
    const item = prompt("Enter new roadmap item:");
    if (item) {
        const roadmapItems = document.getElementById("roadmap-items");
        const newItem = document.createElement("li");
        newItem.innerText = item;
        newItem.oncontextmenu = (e) => editRoadmapItem(e, newItem);
        roadmapItems.appendChild(newItem);
    }
}

// Edit Roadmap item
function editRoadmapItem(event, item) {
    event.preventDefault();
    const newText = prompt("Edit roadmap item:", item.innerText);
    if (newText) {
        item.innerText = newText;
    } else {
        item.classList.toggle('completed');
    }
}

// Restore JavaScript projects from session storage (if any)
window.onload = () => {
    let projects = JSON.parse(sessionStorage.getItem("jsProjects")) || [];
    const jsProjectContainer = document.getElementById("js-projects");

    projects.forEach(project => {
        const newProjectButton = document.createElement("button");
        newProjectButton.classList.add("project-btn");
        newProjectButton.innerHTML = project.name;
        newProjectButton.onclick = () => window.open(project.link, '_blank');
        newProjectButton.oncontextmenu = (e) => showDescription(e, project.name, project.desc);
        jsProjectContainer.appendChild(newProjectButton);
    });
}
