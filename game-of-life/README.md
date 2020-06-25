# My Understanding
the rules of the game simulate an ideal population control
birth can only happen if 3 other cells are living (not 2 as in normal life)
cells have more conditions to die than to live
automata are "cognitive" awareness of self and surroundings
as long as the cell automata can have life the recurssion of new generations will continue
the gol does not meet criteria for turing complete
the turing complete NAND is ifinitely alive and is only false if the inputs are true
double buffering is essentiallay a copy that preps the new life death cycle while the previous is shown 

# My Plan
Have state/array that holds the cells
map throu cells
if cell is false/0 dead otherwise cell is true/1 alive
visualize life and copy to continue moves in game
have function to create and scan copy to visualize life and death
allow stateful updates for cols rows cell color etc
use state to generate count of how many cycles can be made
create a random prefiller for the grid

