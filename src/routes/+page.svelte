<script lang="ts">
    import { browserLocalGet, browserLocalSet } from '$lib/browser';
	import { onMount } from 'svelte';

    let form: any
    let contacts: contact_data[] = []

    interface contact_data {
        name: string,
        email: string,
        phone: string
    }

    onMount(()=>{
        let contact_json = browserLocalGet("contacts")
        if (typeof contact_json == "string") {
            contacts = JSON.parse(contact_json)
        }
    })

    function addHandler(): void  {
        let form_data = Object.fromEntries(new FormData(form));
        let contact: contact_data = {
            name: form_data.name.toString(),
            email: form_data.email.toString(),
            phone: `${form_data.country_code} ${form_data.phone}`
        }

        contacts = [...contacts, contact]
        browserLocalSet("contacts", JSON.stringify(contacts))
        form.reset()
    }
    
    function removeHandler(index: number): void {
        contacts.splice(index, 1)
        contacts = contacts //updates the array after splicing it, this updates the #each block for some reason
        browserLocalSet("contacts", JSON.stringify(contacts))
    }

    function addPlus(event: any): void {
        let val = event.target.value;
        if(!val.match(/^\+/)) {
            event.target.value = "+" + val;
        }
    }

</script>

<body class="pt-8 h-screen bg-gradient-to-r from-zinc-900 to-zinc-800">
    <div class="flex justify-center">
        <h1 class="text-4xl py-4 px-8 text-white font-bold rounded-xl bg-green-500 shadow-xl hover:animate-pulse">
            Welcome Back 🐑
        </h1>
    </div>

    <div class="flex justify-center gap-12">
        <div class="flex justify-center mt-12">
            <form action="" bind:this={form} class="w-[48rem] pb-12 pt-2 h-fit bg-zync-100 rounded-lg shadow-lg text-white bg-zinc-800">
                <div class="mt-8 mb-10 px-12 w-full">
                    <label for="name" class="ml-1 text-xl font-medium block"> Full Name: </label>
                    <input type="text" name="name" class="w-full mt-4 py-2 px-4 text-lg  bg-zinc-800 border-4 rounded-2xl ring-green-500 focus:ring-4 focus:ring-offset-4" placeholder="Insert full name.">
                </div>
    
                <div class="mt-8 mb-10 px-12 w-full">
                    <label for="email" class="ml-1 text-xl font-medium block"> Email: </label>
                    <input type="text" name="email" class="w-full mt-4 py-2 px-4 text-lg bg-zinc-800 border-4 rounded-2xl ring-green-500 focus:ring-4 focus:ring-offset-4" placeholder="Insert email.">
                </div>
    
                <div class="mt-8 mb-10 px-12 w-full">
                    <label for="phone" class="ml-1 text-xl font-medium block"> Phone: </label>
                    <div class="flex">
                        <input on:input={addPlus} type="text" name="country_code" class="w-1/5 mt-4 py-2 px-4 text-lg bg-zinc-800 border-4 border-r-0 rounded-2xl rounded-r-none ring-green-500 focus:z-10 focus:ring-4 focus:ring-offset-4" placeholder="+506 🇨🇷">
                        <input type="number" name="phone" class="w-full mt-4 py-2 px-4 text-lg text- bg-zinc-800 border-4 rounded-2xl rounded-l-none ring-green-500 focus:ring-4 focus:ring-offset-4" placeholder="Insert the phone number.">
                    </div>
                </div>
    
                <div class="flex justify-center mt-8 mb-10">
                    <button on:click|preventDefault={addHandler} class="py-4 px-8 text-lg font-bold text-white bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl ring-black focus:ring-4 focus:ring-offset-4">
                        Add Contact
                    </button>
                </div>
    
            </form>
        </div>
        
        <div class="flex justify-center mt-12">
            <div class="w-[48rem] pb-12 pt-12 px-8 h-fit bg-zync-100 rounded-lg shadow-xl text-white bg-zinc-800"> 

                <div class="flex justify-center">
                    <h1 class="text-4xl py-4 px-8 text-white font-bold rounded-xl shadow-lg">
                        Your Contacts
                    </h1>
                </div>

                {#each contacts as {name, email, phone}, index}
                    <div class="flex w-full h-48 mt-12 px-8 py-8 text-white bg-zinc-700 rounded-xl shadow-lg">
                        <div class="w-[34rem] h-full">
                            <h1 class="mt-2 text-3xl font-bold">
                                {email}
                            </h1>
        
                            <div class="mt-8 flex items-center">
                                <svg class="invert" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path fill="none" d="M0 0h48v48H0z"/><path d="M42 10v28h4V10h-4zm-8 28h4V10h-4v28zm-6-28H4c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zm-12 5.5c2.48 0 4.5 2.02 4.5 4.5a4.5 4.5 0 0 1-9 0c0-2.48 2.02-4.5 4.5-4.5zM25 34H7v-1.5c0-3 6-4.5 9-4.5s9 1.5 9 4.5V34z"/></svg>
                                <p class="ml-3 inline text-2xl ">
                                    {name}
                                </p>
            
                                <svg class="invert ml-4" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M31 2H15c-2.76 0-5 2.24-5 5v34c0 2.76 2.24 5 5 5h16c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5zm-8 42c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9-8H14V8h18v28z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
                                <p class="ml-1 flex text-2xl text-right ">
                                    {phone}
                                </p>
                            </div>
                        </div>
                        
                        <div class="w-[6rem] h-full flex justify-center items-center">
                            <button on:click|preventDefault={()=> removeHandler(index)} class="opacity-80 hover:opacity-100">
                                <svg class="invert scale-125 hover:scale-125" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path fill="none" d="M0 0h48v48H0z"/><path d="M44 6H14c-1.38 0-2.47.7-3.19 1.76L0 23.99l10.81 16.23C11.53 41.28 12.62 42 14 42h30c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-6 25.17L35.17 34 28 26.83 20.83 34 18 31.17 25.17 24 18 16.83 20.83 14 28 21.17 35.17 14 38 16.83 30.83 24 38 31.17z"/></svg>
                            </button>
                        </div>
                        
                    </div>
                {/each}

                {#if contacts.length === 0}
                    <h1 class="mt-12 text-center text-3xl font-bold opacity-50 animate-pulse">
                        No contacts here... <br>
                        Add a contact <br>
                        to display it here!
                    </h1>
                {/if}
                    
            </div>
        </div>
    </div>

    
       
</body>

