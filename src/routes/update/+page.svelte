<!-- filepath: /D:/mismatch/src/routes/update/+page.svelte -->
<script lang="ts">
    import XLSX from "node-xlsx";

    let file: File | null = null;
    let headers: string[] = [];
    let dataRows: any[][] = [];
    let message = '';
    let error = '';
    let loading = false;
    let fileName = '';
    
    // Arrays for each column type
    let teamIds: any[] = [];
    let teamNames: any[] = [];
    let participantIds: any[] = [];
    let participantNames: any[] = [];
    let participantEmails: any[] = [];
    let participantPhones: any[] = [];
    let participantColleges: any[] = [];
    
    // Structured data objects
    let teams: {id: any, name: any}[] = [];
    let participants: {id: any, name: any, email: any, phone: any, college: any, teamId: any}[] = [];

    async function handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        file = target.files ? target.files[0] : null;
        if (file) {
            fileName = file.name;
            await parseFile();
        }
    }

    async function uploadDataTeam() {
        if (teams.length === 0 && participants.length === 0) {
            error = 'No data to upload. Please parse a file first.';
            return;
        }
        
        loading = true;
        error = '';
        message = '';
        
        try {
            const response = await fetch('/api/update-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teams,
                    participants
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }
            
            const result = await response.json();
            message = result.message || 'Data uploaded successfully!';
        } catch (err) {
            error = `Error uploading data: ${err instanceof Error ? err.message : 'Unknown error'}`;
        } finally {
            loading = false;
        }
    }

    async function uploadDataUser() {
        if (teams.length === 0 && participants.length === 0) {
            error = 'No data to upload. Please parse a file first.';
            return;
        }
        
        loading = true;
        error = '';
        message = '';
        
        try {
            const response = await fetch('/api/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    participants
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }
            
            const result = await response.json();
            message = result.message || 'Data uploaded successfully!';
        } catch (err) {
            error = `Error uploading data: ${err instanceof Error ? err.message : 'Unknown error'}`;
        } finally {
            loading = false;
        }
    }

    async function parseFile() {
        if (!file) return;
        
        loading = true;
        error = '';
        message = '';
        headers = [];
        dataRows = [];
        
        // Reset all arrays
        teamIds = [];
        teamNames = [];
        participantIds = [];
        participantNames = [];
        participantEmails = [];
        participantPhones = [];
        participantColleges = [];
        teams = [];
        participants = [];
        
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target?.result;
                    if (!arrayBuffer) throw new Error('Failed to read file');
                    
                    const workbook = XLSX.parse(arrayBuffer);
                    
                    if (workbook.length < 1) {
                        throw new Error('Excel file must contain at least one sheet');
                    }
                    
                    const sheetData = workbook[0].data;
                    
                    if (sheetData.length < 1) {
                        throw new Error('Sheet is empty');
                    }
                    
                    headers = sheetData[0].map((h: any) => h?.toString() || '');
                    
                    dataRows = sheetData.slice(1).filter((row: any[]) => row.length > 0);
                    
                    const teamIdIndex = headers.findIndex(h => h === 'Team ID');
                    const teamNameIndex = headers.findIndex(h => h === 'Team Name');
                    const participantIdIndex = headers.findIndex(h => h === 'Participant ID');
                    const participantNameIndex = headers.findIndex(h => h === 'Participant Name');
                    const emailIndex = headers.findIndex(h => h === 'Participant Email');
                    const phoneIndex = headers.findIndex(h => h === 'Participant Ph No.');
                    const collegeIndex = headers.findIndex(h => h === 'Participant College');
                    
                    if (teamIdIndex !== -1) {
                        teamIds = dataRows.map(row => row[teamIdIndex]).filter(Boolean);
                    }
                    
                    if (teamNameIndex !== -1) {
                        teamNames = dataRows.map(row => row[teamNameIndex]).filter(Boolean);
                    }
                    
                    if (participantIdIndex !== -1) {
                        participantIds = dataRows.map(row => row[participantIdIndex]).filter(Boolean);
                    }
                    
                    if (participantNameIndex !== -1) {
                        participantNames = dataRows.map(row => row[participantNameIndex]).filter(Boolean);
                    }
                    
                    if (emailIndex !== -1) {
                        participantEmails = dataRows.map(row => row[emailIndex]).filter(Boolean);
                    }
                    
                    if (phoneIndex !== -1) {
                        participantPhones = dataRows.map(row => row[phoneIndex]).filter(Boolean);
                    }
                    
                    if (collegeIndex !== -1) {
                        participantColleges = dataRows.map(row => row[collegeIndex]).filter(Boolean);
                    }
                    
                    const teamsMap = new Map();
                    if (teamIdIndex !== -1 && teamNameIndex !== -1) {
                        dataRows.forEach(row => {
                            const id = row[teamIdIndex];
                            const name = row[teamNameIndex];
                            if (id && name) {
                                teamsMap.set(id, name);
                            }
                        });
                        
                        teams = Array.from(teamsMap.entries()).map(([id, name]) => ({ id, name }));
                    }
                    
                    if (participantNameIndex !== -1 && emailIndex !== -1) {
                        participants = dataRows
                            .filter(row => row[participantNameIndex] && row[emailIndex])
                            .map(row => ({
                                id: participantIdIndex !== -1 ? row[participantIdIndex] : null,
                                name: row[participantNameIndex],
                                email: row[emailIndex],
                                phone: phoneIndex !== -1 ? row[phoneIndex] : null,
                                college: collegeIndex !== -1 ? row[collegeIndex] : null,
                                teamId: teamIdIndex !== -1 ? row[teamIdIndex] : null
                            }));
                    }
                    
                    message = `Successfully parsed ${dataRows.length} rows with ${headers.length} columns. Created ${teams.length} teams and ${participants.length} participants.`;
                } catch (err) {
                    error = `Error parsing file: ${err instanceof Error ? err.message : 'Unknown error'}`;
                } finally {
                    loading = false;
                }
            };
            reader.onerror = () => {
                error = 'Error reading file';
                loading = false;
            };
            reader.readAsArrayBuffer(file);
        } catch (err) {
            let errorMessage = 'Unknown error';
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'object' && err !== null && 'message' in err) {
                errorMessage = (err as { message: string }).message;
            }
            error = `Error parsing file: ${errorMessage}`;
            loading = false;
        }
    }
    
    function logData() {
        console.log({
            teamIds,
            teamNames,
            participantIds,
            participantNames,
            participantEmails,
            participantPhones,
            participantColleges,
            teams,
            participants
        });
    }
</script>

<div class="container mx-auto px-4 py-8 max-w-7xl">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Excel Data Viewer</h1>
    
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
        <div class="mb-6">
            <label for="xlsx-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500">
                        <span class="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-500">Excel files only (.xlsx)</p>
                    {#if fileName}
                        <p class="mt-2 text-sm text-blue-600 font-medium">{fileName}</p>
                    {/if}
                </div>
                <input 
                    type="file" 
                    id="xlsx-file" 
                    class="hidden"
                    accept=".xlsx" 
                    on:change={handleFileChange}
                    disabled={loading}
                />
            </label>
        </div>
        
        {#if loading}
            <div class="flex justify-center items-center my-6">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                <span class="ml-3 text-gray-700">Processing...</span>
            </div>
        {/if}
        
        {#if message}
            <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">{message}</div>
        {/if}
        
        {#if error}
            <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>
        {/if}
        
        {#if teams.length > 0 || participants.length > 0}
            <div class="mt-4">
                <button 
                    class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2"
                    on:click={logData}
                >
                    Log Extracted Data
                </button>
                <p class="mt-2 text-xs text-gray-500">Check the browser console to see the extracted data arrays and objects</p>
            </div>
        {/if}
    </div>
    
    {#if dataRows.length > 0}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {#if teams.length > 0}
                <div class="bg-white shadow-md rounded-lg overflow-hidden">
                    <div class="bg-gray-50 p-4 border-b">
                        <h2 class="text-xl font-semibold text-gray-700">Teams ({teams.length})</h2>
                    </div>
                    <div class="overflow-x-auto max-h-96">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {#each teams as team}
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.id}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.name}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            {/if}
            
            {#if participants.length > 0}
                <div class="bg-white shadow-md rounded-lg overflow-hidden">
                    <div class="bg-gray-50 p-4 border-b">
                        <h2 class="text-xl font-semibold text-gray-700">Participants ({participants.length})</h2>
                    </div>
                    <div class="overflow-x-auto max-h-96">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team ID</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {#each participants as participant}
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.id || ''}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.name || ''}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.email || ''}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.phone || ''}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.college || ''}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.teamId || ''}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            {/if}
        </div>
        
        <div class="mt-6 text-center text-sm text-gray-500">
            <p>Data organized from the Excel file into teams and participants.</p>
        </div>
    {/if}

    {#if dataRows.length > 0 && !(teams.length > 0 || participants.length > 0)}
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="bg-gray-50 p-4 border-b">
                <h2 class="text-xl font-semibold text-gray-700">Raw Excel Data ({dataRows.length} rows)</h2>
            </div>
            <div class="overflow-x-auto max-h-96">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50 sticky top-0">
                        <tr>
                            {#each headers as header, index}
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header || `Column ${index + 1}`}
                                </th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {#each dataRows as row}
                            <tr class="hover:bg-gray-50">
                                {#each headers.map((_, i) => row[i]) as cell}
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {cell !== undefined && cell !== null ? cell : ''}
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
    {#if teams.length > 0 || participants.length > 0}
        <div class="mt-8">
            <div class="bg-white shadow-md rounded-lg p-6">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Upload Data</h2>
                <p class="text-gray-600 mb-4">Upload the extracted data to the database.</p>
                <button 
                    class="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={uploadDataTeam}
                    disabled={loading}
                >
                    {#if loading}
                        <span>Uploading...</span>
                    {:else}
                        <span>Upload Data</span>
                    {/if}
                </button>
                <button 
                    class="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={uploadDataUser}
                    disabled={loading}
                >
                    {#if loading}
                        <span>Uploading...</span>
                    {:else}
                        <span>Upload Data User</span>
                    {/if}
                </button>
                <p class="mt-2 text-xs text-gray-500">This will upload {teams.length} teams and {participants.length} participants to the database.</p>
            </div>
        </div>
    {/if}
</div>