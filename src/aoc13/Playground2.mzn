% variables
int: max_a;
int: max_b;

array[1..2] of int :a_button;
array[1..2] of int :b_button;
array[1..2] of int :prize;
array[1..2] of var int: pressed_buttons;

% constraints
constraint ((a_button[1] * pressed_buttons[1]) + (b_button[1]*pressed_buttons[2])=prize[1]);
constraint ((a_button[2] * pressed_buttons[1]) + (b_button[2]*pressed_buttons[2])=prize[2]);

constraint (pressed_buttons[1] >=0);
constraint (max_a >= pressed_buttons[1]);
constraint (pressed_buttons[2] >=0);
constraint (max_b >= pressed_buttons[2]);

% goal
var int:goal=  pressed_buttons[1]*3 +pressed_buttons[2] ;
solve minimize goal;

output ["\(pressed_buttons)",
];
