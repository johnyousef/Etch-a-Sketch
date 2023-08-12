const grid_container = document.querySelector("div.grid-container");
const color_input = document.querySelector(".color-input"); 
const rgb_button = document.querySelector(".rgb-button");
const clear_all_button = document.querySelector(".clear-all");
const grid_size_input = document.querySelector(".grid-size-changer");
const grid_size_desplay = document.querySelector(".grid-size-desplay");
const creat_new_grid_button = document.querySelector(".creat-new-grid");

const random_color = ``;
let rgb_on = false;
grid_size_input.value = 16;
grid_size_desplay.textContent = "16";
let grid_size = grid_size_input.value;

function main() {
    make_grid(grid_size);   
    let color = color_input.value;

    // if the user clicks on the rgb button 
    rgb_button.addEventListener("click", () => {
        // rgb coloring will be on
        rgb_on = true;
    });

    // when user changes size of the grid
    grid_size_input.addEventListener("input", () => {
        // update the value
        grid_size = grid_size_input.value;
        grid_size_desplay.textContent = `${grid_size}`;
        });

    // if the user changes the color
    color_input.addEventListener("change", () => {
        // change old color to new color and turn rgb off
        color = color_input.value;
        rgb_on = false;
    });


    creat_new_grid_button.addEventListener("click", () =>{    
        delete_grid(Math.sqrt(grid_container.childNodes.length));
        make_grid(grid_size);
    });

    // when user click on clear all
    clear_all_button.addEventListener("click", () => {
        clear_all(Math.sqrt(grid_container.childNodes.length));
    });

    let grid_element;
    grid_container.addEventListener("mouseover", function color_changer(e) {
        grid_element = e.target;

        if (rgb_on) {
            grid_element.style.cssText += `background-color: rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)});` 
        }else{
            grid_element.style.cssText += `background-color: ${color};`
        }
    });

}

// creating the grid with side length "side"
function make_grid(num_of_grids_each_side) {
    let grid_element;

    for (let i = 0; i < num_of_grids_each_side ** 2; i++) {
        grid_element = document.createElement("div");
        grid_element.setAttribute("class", "grid-element");
        
        grid_element.style.cssText = `height: ${500 / num_of_grids_each_side}px; width: ${500 / num_of_grids_each_side}px;`;
        
        grid_container.append(grid_element);
    }
}

function delete_grid(num_of_grids_each_side) {
    for (let i = 0; i < num_of_grids_each_side ** 2; i++) {
        grid_container.removeChild(grid_container.firstChild);
    }    
}

function clear_all(num_of_grids_each_side) {
    for (let i = 0; i < num_of_grids_each_side ** 2; i++) {
        grid_container.childNodes[i].style.cssText += "background-color: white;";
    }
}

main();