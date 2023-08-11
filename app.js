const grid_container = document.querySelector("div.grid-container");
const grid_container_side_length = 500;

function main() {
    make_grid(8);    


}

// creating the grid with side length "side"
function make_grid(num_of_grids_each_side) {
    let grid_element;

    for (let i = 0; i < num_of_grids_each_side ** 2; i++) {
        grid_element = document.createElement("div");
        grid_element.setAttribute("class", "grid-element");
        
        grid_element.style.cssText = `height: ${grid_container_side_length / num_of_grids_each_side - 2}px; width: ${grid_container_side_length / num_of_grids_each_side - 2}px;`;

        grid_container.append(grid_element);
    }
}

main();