
# Goal 
## A program that you can inter your monthly budget into,

### MVP - Minimum Viable Product
### Stretch Goals - Extra / rich feature that is a bit harder to implament


# MVP Goals
* Then your expenses, the eexpenses should be charagoized. 
    * should be categorized in what way? 
        food, hosuing, shopping, entertainment etc...
    * should it be categorized by default? 
        I think so
        so users should be able to add in what kind of expense they are adding?
        No, It will be predefined. 
        a drop down menu maybe
        right but that would still be user interaction
        sure, when the user wants to enter a new expense, He will chose 
        The catagoty from the menu then inter the expense. 
        perfect ok
    * do we want to be able to search by these fileds?
        yes, By the chatagories. 
        

* The app should tell us how much we have spent so far this month, 
And how much we have left.
    So a total sum spent so far this month, and what we have left
    like on a credit card?
    I don't have a credit card, but yes lol
    or like a bank account where you withdraw and add funds to? 
    and we can track that
    yes
    got it
    
    Can we add money to the account at any time? or
    is this more like a budget app? where we would
    have to ajust how much we are allowed to spend per month?

    We can add. Then we set the limits on chatagories.  
    so the budget should change then when we add?
    not if i get paid bi weekly then get a bounus, we would not 
    be adding in that bouns that we got? Or we will add in the bonus money?
    we will be adding it.
    so then we would want a field to add to the total amount left over that we can spend?

    Any amount of money that is not set in a chatagory, goes to savings directly. 

    So If we get paid $1000

    we have $250 food
    $250 rent
    $50 fun 
    The $450 should directly go to savings. 

    so if we add $200 to the budget, the savings becomes $650
    Got it?

    OH MY, you want to dynamically allocate money?
    is it very Hard? 
    This is a learning experience, right? lol 
    how would we know how much to allocate to 
    food, rent, fun? unless its a %
    the user will allocate those. 
    ok so then if we get say $250 and add that in, do we
    add to the food, or rent or does it go strait to savings?   
    it goes strait to saving, unless the user allocates it elsewere

    The saving = Money in the budget that is not allocated to a chatagory. 
    Oh ok that makese sense, so if we add in any money that money will
    go right to savings unless the user decides to increase the budget
    for any given category?
    yes. 
    ok that works, this will be FUN! lots of littel challenges in this that
    are unique ones.
    Yes, I hope it will be helpful to you too. 
    ive never done these features but know how to go about them. so yea this
    will be some growing for me. 100% doable just never done it but
    know how to go abou it.

    Practice, and making solutions for problems you have, is the best way to learn. 

    Shall we go to the HTML?
    actually...I think it will be better to make a really rough wire frame first
    so that both of us know what UI we want to achieve. there
    are going to be a LOT of little moving parts to this not gonna lie.

    ok, what is that online design colaboration called?
    yes 
    FIGMA! whip one up and share the link 
    ill create a google doc to put all this info into and also a README
(MVP)
* We should also be able to set chatagory limits. 
so if we have $200 limit on food, and we exeed it, the app will warn us but still
allow for the expense to go through.

(Stretch Goal)
implament a way to suggest where to cut down on one expense to componsate
for the category over charge.
prompt us to make sure we componsate for it in another chatagoy (maybe it can be 
smart enough to suggest one? not sure).

    will we still be able to book this expense or will it force you to enter in a
    entry that is less than or qual to the allowed limit for the expense type / category?

    No force, Just warning and suggestions.
    got it ok, so we can start with a warning message
    and then work in a feature for suggestion after that. 

(STRETCH GOAL)
* would also be really cool if we could integrate apecharts into it. but that can wait
until I try implementing it in Vue or React.