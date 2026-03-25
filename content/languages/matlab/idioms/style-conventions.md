---
title: "Style Conventions"
language: "matlab"
feature: "style-conventions"
category: "idioms"
applicable: true
---

MATLAB style follows MathWorks' published style guidelines. Functions and variables use `camelCase` or `snake_case` (community mixed). Constants use `UPPER_CASE`. Each function lives in its own `.m` file. Semicolons suppress output. The `%` comment and `%% Section` markers structure scripts.

## Example

```matlab
%% myUtils.m — example following MATLAB style

function result = computeMovingAverage(data, windowSize)
% computeMovingAverage  Compute moving average of a vector.
%
% RESULT = computeMovingAverage(DATA, WINDOWSIZE) returns the
% centered moving average of DATA using a window of WINDOWSIZE.
%
% See also: movmean, filter

    arguments
        data       (:,1) double
        windowSize (1,1) double {mustBePositive, mustBeInteger}
    end

    result = movmean(data, windowSize);
end

% Constants in UPPER_CASE (usually at top of script or function)
MAX_ITERATIONS = 1000;
TOLERANCE      = 1e-6;
DEFAULT_COLOR  = [0.2, 0.4, 0.8];

% Section breaks with %% for publishing/navigation
%% Data Loading
data = load('mydata.mat');

%% Processing
smoothed = computeMovingAverage(data.values, 5);

%% Visualization
figure;
plot(smoothed)
title('Smoothed Data')
xlabel('Sample')
ylabel('Value')
```

## Gotchas

- Always end statements with `;` in functions — missing semicolons spam the console and slow execution.
- Use `%% Section Title` to create code sections visible in the MATLAB editor and publishable as HTML/PDF.
- The first line of a function's comment block (the H1 line) is what `help function_name` and `lookfor` display.
- MathWorks recommends `camelCase` for functions; the community is mixed. Pick one and be consistent within a project.
