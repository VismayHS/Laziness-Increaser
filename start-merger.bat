@echo off
setlocal enabledelayedexpansion

set "FRONTEND_PORT=10001"
set "BACKEND_PORT=10002"
set "FRONTEND_URL=http://localhost:%FRONTEND_PORT%/"
set "BACKEND_URL=http://localhost:%BACKEND_PORT%/"

cd /d "%~dp0"

echo Checking PPT/PDF Merger status...

set "FRONTEND_UP=0"
set "BACKEND_UP=0"

powershell -NoProfile -Command "try { Invoke-WebRequest -Uri '%FRONTEND_URL%' -UseBasicParsing -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }"
if %ERRORLEVEL% EQU 0 set "FRONTEND_UP=1"

powershell -NoProfile -Command "try { Invoke-WebRequest -Uri '%BACKEND_URL%' -UseBasicParsing -TimeoutSec 2 -Method Head | Out-Null; exit 0 } catch { exit 1 }"
if %ERRORLEVEL% EQU 0 set "BACKEND_UP=1"

if "%FRONTEND_UP%"=="1" if "%BACKEND_UP%"=="1" (
    echo.
    echo [ACTIVE] Frontend already running at %FRONTEND_URL%
    echo [ACTIVE] Backend  already running at %BACKEND_URL%
    goto :end
)

echo Starting missing service(s)...
echo.

if "%BACKEND_UP%"=="0" (
    start "PPT-PDF Merger Backend" cmd /c "set PORT=%BACKEND_PORT%&& node server.js"
)

if "%FRONTEND_UP%"=="0" (
    start "PPT-PDF Merger Frontend" cmd /c "npm --prefix frontend run dev -- --port %FRONTEND_PORT%"
)

echo Waiting for servers to come up...

set /a tries=0
:waitloop
set /a tries+=1

powershell -NoProfile -Command "try { Invoke-WebRequest -Uri '%FRONTEND_URL%' -UseBasicParsing -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }"
if %ERRORLEVEL% EQU 0 set "FRONTEND_UP=1"

powershell -NoProfile -Command "try { Invoke-WebRequest -Uri '%BACKEND_URL%' -UseBasicParsing -TimeoutSec 2 -Method Head | Out-Null; exit 0 } catch { exit 1 }"
if %ERRORLEVEL% EQU 0 set "BACKEND_UP=1"

if "%FRONTEND_UP%"=="1" if "%BACKEND_UP%"=="1" goto :ready
if %tries% GEQ 45 goto :timeout
timeout /t 1 /nobreak >nul
goto :waitloop

:ready
echo.
echo [ACTIVE] Frontend: %FRONTEND_URL%
echo [ACTIVE] Backend:  %BACKEND_URL%  (API: %BACKEND_URL%process)
goto :end

:timeout
echo.
if "%FRONTEND_UP%"=="0" echo [NOT READY] Frontend did not respond within 45 seconds.
if "%BACKEND_UP%"=="0" echo [NOT READY] Backend did not respond within 45 seconds.
echo Check the "PPT-PDF Merger Frontend" / "PPT-PDF Merger Backend" windows for errors.

:end
endlocal
