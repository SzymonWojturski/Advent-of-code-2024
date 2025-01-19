% variables
array[1..2] of int :a_button;
array[1..2] of int :b_button;
array[1..2] of int :prize;
array[1..2] of var int: pressed_buttons;

% variable maximizator
array[1..2] of var int: constraints_met;

% constraints
constraint constraints_met[1]=((a_button[1] * pressed_buttons[1]) + (b_button[1]*pressed_buttons[2])=prize[1]);
constraint constraints_met[2]=(((a_button[2] * pressed_buttons[1]) + (b_button[2]*pressed_buttons[2]))=prize[2]);

constraint (pressed_buttons[1] >=0);
constraint (100 >= pressed_buttons[1]);
constraint (pressed_buttons[2] >=0);
constraint (100 >= pressed_buttons[2]);

% goal
var int:goal=sum(constraints_met)*(300) - pressed_buttons[1]*3 -pressed_buttons[2] ;
solve maximize goal;

output ["\(constraints_met)","\(pressed_buttons)",
];
