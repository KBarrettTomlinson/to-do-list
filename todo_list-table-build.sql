CREATE TABLE todo_list (
	id SERIAL PRIMARY KEY,
	task VARCHAR(140),
	priority INT,
	next_step VARCHAR(140),
	completed BOOLEAN DEFAULT FALSE
);

INSERT INTO "todo_list" ("task", "priority", "next_step")
VALUES ('laundry','1','sort into piles'),('water plants','2','clear out sink'),('dishes','4','empty dishwasher');