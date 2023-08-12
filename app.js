const grid_container = document.querySelector("div.grid-container");
const color_input = document.querySelector(".color-input"); 
const rgb_button = document.querySelector(".rgb-button");
const clear_all_button = document.querySelector(".clear-all");
const grid_size_input = document.querySelector(".grid-size-changer");
const grid_size_desplay = document.querySelector(".grid-size-desplay");
const creat_new_grid_button = document.querySelector(".creat-new-grid");
const shader_button = document.querySelector(".shader-button");

const random_color = ``;
let rgb_on = false;
let shader_on = false;
grid_size_input.value = 16;
grid_size_desplay.textContent = "16";
let grid_size = grid_size_input.value;
let red_value = 0;
let green_value = 0;
let blue_value = 0;


function main() {
    make_grid(grid_size);   
    let color = "rgb(0, 0, 0)";
    
    shader_button.addEventListener("click", () => {
        rgb_on = false;
        shader_on = true;
    });

    // if the user clicks on the rgb button 
    rgb_button.addEventListener("click", () => {
        // rgb coloring will be on
        rgb_on = true;
        shader_on = false;
    });

    // when user changes size of the grid
    grid_size_input.addEventListener("input", () => {
        // update the value
        grid_size = grid_size_input.value;
        grid_size_desplay.textContent = `${grid_size}`;
    });

    // if the user changes the color
    color_input.addEventListener("click", () => {
        // change old color to new color and turn rgb off
        color = turn_to_rgb(color_input.value)[0];
        red_value = turn_to_rgb(color_input.value)[1];
        green_value = turn_to_rgb(color_input.value)[2];
        blue_value = turn_to_rgb(color_input.value)[3];

        rgb_on = false;
        shader_on = false;
    });


    creat_new_grid_button.addEventListener("click", () =>{    
        delete_grid(Math.sqrt(grid_container.childNodes.length));
        make_grid(grid_size);
    });

    // when user click on clear all
    clear_all_button.addEventListener("click", () => {
        clear_all(Math.sqrt(grid_container.childNodes.length));
    });

    let red_value_rgb = 0;
    let green_value_rgb = 0;
    let blue_value_rgb = 0;    
    let grid_element;
    let rgb_array = [];
    grid_container.addEventListener("mouseover", function color_changer(e) {
        grid_element = e.target;
        console.log(e);
        console.log(e.target.attributes.data_rgb_values.value);

        if (rgb_on) {
            red_value_rgb = Math.floor(Math.random() * 256);
            green_value_rgb = Math.floor(Math.random() * 256);
            blue_value_rgb = Math.floor(Math.random() * 256);

            grid_element.style.cssText += `background-color: rgb(${red_value_rgb}, ${green_value_rgb}, ${blue_value_rgb});`;
            grid_element.setAttribute("data_rgb_values", `${red_value_rgb},${green_value_rgb},${blue_value_rgb}`);
        }else if (shader_on){
            rgb_array = e.target.attributes.data_rgb_values.value.split(",");
            grid_element.style.cssText += `background-color: rgb(${rgb_array[0]-25.5}, ${rgb_array[1]-25.5}, ${rgb_array[2]-25.5})`;
            grid_element.setAttribute("data_rgb_values", `${rgb_array[0]-25.5},${rgb_array[1]-25.5},${rgb_array[2]-25.5}`);
        }else{
            grid_element.style.cssText += `background-color: ${color};`
            grid_element.setAttribute("data_rgb_values", `${red_value},${green_value},${blue_value}`);
        }

        console.log(e.target.attributes.data_rgb_values.value);

    });

}

function turn_to_rgb(hex_color) {
    hex_values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    let red_value;
    let green_value;
    let blue_value;

    let hex_l1_value,
        hex_l2_value,
        hex_l3_value,
        hex_l4_value,
        hex_l5_value,
        hex_l6_value;

    for (let i = 0; i < 16; i++) {
        if (hex_values[i] === hex_color[1]) {
            hex_l1_value = i; 
        }if (hex_values[i] === hex_color[2]) {
            hex_l2_value = i; 
        }if (hex_values[i] === hex_color[3]) {
            hex_l3_value = i; 
        }if (hex_values[i] === hex_color[4]) {
            hex_l4_value = i; 
        }if (hex_values[i] === hex_color[5]) {
            hex_l5_value = i; 
        }if (hex_values[i] === hex_color[6]) {
            hex_l6_value = i; 
        }
    }

    red_value = hex_l1_value * 16 + hex_l2_value;
    green_value = hex_l3_value * 16 + hex_l4_value;
    blue_value = hex_l5_value * 16 + hex_l6_value;

    return [`rgb(${red_value}, ${green_value}, ${blue_value})`, red_value, green_value, blue_value];
}

// creating the grid with side length "side"
function make_grid(num_of_grids_each_side) {
    let grid_element;

    for (let i = 0; i < num_of_grids_each_side ** 2; i++) {
        grid_element = document.createElement("div");
        grid_element.setAttribute("class", "grid-element");
        
        grid_element.style.cssText = `height: ${500 / num_of_grids_each_side}px; width: ${500 / num_of_grids_each_side}px;`;
        grid_element.setAttribute("data_rgb_values", "255,255,255");
        
        grid_container.append(grid_element);
    }

    clear_all(Math.sqrt(grid_container.childNodes.length));
}

function delete_grid(num_of_grids_each_side) {
    for (let i = 0; i < num_of_grids_each_side ** 2; i++) {
        grid_container.removeChild(grid_container.firstChild);
    }    
}

function clear_all(num_of_grids_each_side) {
    for (let i = 0; i < num_of_grids_each_side ** 2; i++) {
        grid_container.childNodes[i].style.cssText += "background-color: rgb(255, 255, 255);";
    }
}

main();