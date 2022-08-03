# What's this?

BLM does not have a strict rotation (like DRG), or a "burst window" where you put all your hard hitting GCDs in a cooldown window (like GNB), where you intuitively know if you screw up (like RDM using Jolt when you have both procs), and know if you are doing well (SAM or GNB burst).

Instead, BLM has a more freestyle approach, where you can adjust your rotation to fit the fight mechanics better.

BLM rotation consist of "lines" that you repeat over the course of the fight. The standard line consists of `B3 B4 PD F3 3xF4 PD 3xF4 Desp (F3P)`. When you perform a "non-standard" lines, e.g. "short fire phase" `B3 PD F3 4xF4 Desp`, it is not immediately clear if this line result in a gain or loss of dps.

To compare the lines, a "Potency per second" (pps) is calculated for each line. Total damage of the skills is calculated and divided over the total amount of time required to perform the skills, with AF and UI modifiers. This pps is then compared to pps of the standard line to see if it results in a gain or loss of dps.

This app does not check if your specified line is actually possible, like casting 2 Despairs in a row without Manafont, or checking whether you have enough mp, or casting 100 F4 in a single fire phase.

# Caster tax

When you cast a spell longer than, or equal to, your recast time (F4, Desp, AF PD), the game "clips" briefly between the spells. In the calculation, `0.1` second is added to these spell's cast time to simulate this.

# Filler spells

When you perform Transpose lines, you need to cast "filler spells" during UI in order to get enough mp for the next fire phase.

In this app, filler spells are spells you can cast anywhere in your rotation that does not change your phase. I list Xenoglossy and T3 as filler spells for visual convinience. These filler spells are not calculated for the line's pps.

# Some todos

- add transpose

- add Swiftcast and Triplecast
