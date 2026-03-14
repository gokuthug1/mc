import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const ASSET_PATH = "./assets/textures/";
const ANIM_FRAMES = 32; 

// --- 1. ASSET DEFINITIONS ---
const ITEMS = {
    'grass': { name: 'Grass Block', src: ASSET_PATH + 'block/grass_block_side.png', block: true, transparent: false },
    'dirt': { name: 'Dirt', src: ASSET_PATH + 'block/dirt.png', block: true, transparent: false },
    'stone': { name: 'Stone', src: ASSET_PATH + 'block/stone.png', block: true, transparent: false },
    'sand': { name: 'Sand', src: ASSET_PATH + 'block/sand.png', block: true, gravity: true, transparent: false },
    'oak_log': { name: 'Oak Log', src: ASSET_PATH + 'block/oak_log.png', block: true, transparent: false },
    'oak_log_tb': { name: 'Oak Log Top', src: ASSET_PATH + 'block/oak_log_top.png', block: true, transparent: false },
    'oak_leaves': { name: 'Oak Leaves', src: ASSET_PATH + 'block/oak_leaves.png', block: true, transparent: true },
    'oak_planks': { name: 'Oak Planks', src: ASSET_PATH + 'block/oak_planks.png', block: true, transparent: false },
    'cobblestone': { name: 'Cobblestone', src: ASSET_PATH + 'block/cobblestone.png', block: true, transparent: false },
    'glass': { name: 'Glass', src: ASSET_PATH + 'block/glass.png', block: true, transparent: true },
    'brick': { name: 'Bricks', src: ASSET_PATH + 'block/bricks.png', block: true, transparent: false },
    'furnace': { name: 'Furnace', src: ASSET_PATH + 'block/furnace_front.png', block: true, transparent: false },
    'chest': { name: 'Chest', src: ASSET_PATH + 'block/chest_front.png', block: true, transparent: true },
    'crafting_table': { name: 'Crafting Table', src: ASSET_PATH + 'block/crafting_table_front.png', block: true, transparent: false },
    'oak_door': { name: 'Oak Door', src: ASSET_PATH + 'item/oak_door.png', block: true, transparent: true },
    'oak_trapdoor': { name: 'Oak Trapdoor', src: ASSET_PATH + 'block/oak_trapdoor.png', block: true, transparent: true },
    
    'coal_ore': { name: 'Coal Ore', src: ASSET_PATH + 'block/coal_ore.png', block: true, transparent: false },
    'iron_ore': { name: 'Iron Ore', src: ASSET_PATH + 'block/iron_ore.png', block: true, transparent: false },
    'diamond_ore': { name: 'Diamond Ore', src: ASSET_PATH + 'block/diamond_ore.png', block: true, transparent: false },
    'diamond_block': { name: 'Diamond Block', src: ASSET_PATH + 'block/diamond_block.png', block: true, transparent: false },
    'iron_block': { name: 'Iron Block', src: ASSET_PATH + 'block/iron_block.png', block: true, transparent: false },
    'coal_block': { name: 'Coal Block', src: ASSET_PATH + 'block/coal_block.png', block: true, transparent: false },
    'obsidian': { name: 'Obsidian', src: ASSET_PATH + 'block/obsidian.png', block: true, transparent: false },
    'gravel': { name: 'Gravel', src: ASSET_PATH + 'block/gravel.png', block: true, gravity: true, transparent: false },

    'coal': { name: 'Coal', src: ASSET_PATH + 'item/coal.png', block: false },
    'raw_iron': { name: 'Raw Iron', src: ASSET_PATH + 'item/raw_iron.png', block: false },
    'iron_ingot': { name: 'Iron Ingot', src: ASSET_PATH + 'item/iron_ingot.png', block: false },
    'diamond': { name: 'Diamond', src: ASSET_PATH + 'item/diamond.png', block: false },
    'stick': { name: 'Stick', src: ASSET_PATH + 'item/stick.png', block: false },
    'flint': { name: 'Flint', src: ASSET_PATH + 'item/flint.png', block: false },
    'bucket': { name: 'Bucket', src: ASSET_PATH + 'item/bucket.png', block: false },
    'lava_bucket': { name: 'Lava Bucket', src: ASSET_PATH + 'item/lava_bucket.png', block: false },
    'flint_and_steel': { name: 'Flint and Steel', src: ASSET_PATH + 'item/flint_and_steel.png', block: false },
    'enchanted_golden_apple': { name: 'Enchanted Golden Apple', src: ASSET_PATH + 'item/enchanted_golden_apple.png', block: false },
    
    'wooden_pickaxe': { name: 'Wooden Pickaxe', src: ASSET_PATH + 'item/wooden_pickaxe.png', block: false },
    'stone_pickaxe': { name: 'Stone Pickaxe', src: ASSET_PATH + 'item/stone_pickaxe.png', block: false },
    'iron_pickaxe': { name: 'Iron Pickaxe', src: ASSET_PATH + 'item/iron_pickaxe.png', block: false },
    'diamond_pickaxe': { name: 'Diamond Pickaxe', src: ASSET_PATH + 'item/diamond_pickaxe.png', block: false },

    'wooden_sword': { name: 'Wooden Sword', src: ASSET_PATH + 'item/wooden_sword.png', block: false },
    'stone_sword': { name: 'Stone Sword', src: ASSET_PATH + 'item/stone_sword.png', block: false },
    'iron_sword': { name: 'Iron Sword', src: ASSET_PATH + 'item/iron_sword.png', block: false },
    'diamond_sword': { name: 'Diamond Sword', src: ASSET_PATH + 'item/diamond_sword.png', block: false },
    'wooden_axe': { name: 'Wooden Axe', src: ASSET_PATH + 'item/wooden_axe.png', block: false },
    'stone_axe': { name: 'Stone Axe', src: ASSET_PATH + 'item/stone_axe.png', block: false },
    'iron_axe': { name: 'Iron Axe', src: ASSET_PATH + 'item/iron_axe.png', block: false },
    'diamond_axe': { name: 'Diamond Axe', src: ASSET_PATH + 'item/diamond_axe.png', block: false },
    'wooden_shovel': { name: 'Wooden Shovel', src: ASSET_PATH + 'item/wooden_shovel.png', block: false },
    'stone_shovel': { name: 'Stone Shovel', src: ASSET_PATH + 'item/stone_shovel.png', block: false },
    'iron_shovel': { name: 'Iron Shovel', src: ASSET_PATH + 'item/iron_shovel.png', block: false },
    'diamond_shovel': { name: 'Diamond Shovel', src: ASSET_PATH + 'item/diamond_shovel.png', block: false },
    
    'fire': { name: 'Fire', src: ASSET_PATH + 'block/fire.png', block: true, transparent: true },
    'lava': { name: 'Lava Source', src: ASSET_PATH + 'block/lava.png', block: true, transparent: false }, 
    'lava_flow': { name: 'Lava Flow', src: ASSET_PATH + 'block/lava_flow.png', block: true, transparent: false },
    'nether_portal': { name: 'Nether Portal', src: ASSET_PATH + 'block/nether_portal.png', block: true, transparent: true },
    
    'oak_door_b': { name: 'Oak Door', src: ASSET_PATH + 'block/oak_door_bottom.png', block: true, transparent: true }, 
    'oak_door_top': { name: 'Oak Door', src: ASSET_PATH + 'block/oak_door_top.png', block: true, transparent: true }
};

const textureLoader = new THREE.TextureLoader();
const textures = {};
let fireTexture1, fireTexture2, fireMaterial, lavaSrcTexture, lavaFlowTexture;

// SETTINGS
let showFPS = false;
let limitFPS = 0; // 0 = unlimited
let lastFrameTime = 0;
let userSkinImage = null; // Stores uploaded skin image

// --- CHAT & USER SETTINGS ---
let username = "Steve";
let chatKey = 'KeyT';
let isChatOpen = false;
let isSettingChatKey = false;
const activeChatMessages =[]; 
const CHAT_TIMEOUT = 5000; 

// --- 3rd PERSON & PLAYER MODEL VARIABLES ---
let viewMode = 0; // 0: First, 1: Third Back, 2: Third Front
let playerGroup, playerHead, playerBody, leftArm, rightArm, leftLeg, rightLeg;
let tpsCamDist = 0; 
const MAX_TPS_DIST = 60;

// GLOBAL GEOMETRIES FOR PERFORMANCE
const BLOCK = 20;
const boxGeometry = new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK);
const planeGeometry = new THREE.PlaneGeometry(BLOCK, BLOCK);

// INSTANCED MESH OPTIMIZATION
const SIMPLE_BLOCKS = new Set(['grass', 'dirt', 'stone', 'sand', 'oak_log', 'oak_log_tb', 'oak_leaves', 'oak_planks', 'cobblestone', 'glass', 'brick', 'coal_ore', 'iron_ore', 'diamond_ore', 'diamond_block', 'iron_block', 'coal_block', 'obsidian', 'gravel']);
const imManager = {
    meshes: {}, freeIds: {}, counts: {}, MAX: 80000,
    add: function(type, x, y, z) {
        if (!this.meshes[type]) {
            const mat = getBlockMaterial(type);
            const im = new THREE.InstancedMesh(boxGeometry, mat, this.MAX);
            im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            im.count = 0; scene.add(im);
            this.meshes[type] = im; this.freeIds[type] = []; this.counts[type] = 0;
        }
        const im = this.meshes[type];
        let id = this.freeIds[type].length > 0 ? this.freeIds[type].pop() : this.counts[type]++;
        if(this.counts[type] > im.count) im.count = this.counts[type];

        const dummy = new THREE.Object3D();
        dummy.position.set(x, y, z); dummy.updateMatrix();
        im.setMatrixAt(id, dummy.matrix); im.instanceMatrix.needsUpdate = true;
        return id;
    },
    remove: function(type, id) {
        const im = this.meshes[type]; if(!im) return;
        const dummy = new THREE.Object3D(); dummy.scale.set(0, 0, 0); dummy.updateMatrix();
        im.setMatrixAt(id, dummy.matrix); im.instanceMatrix.needsUpdate = true;
        this.freeIds[type].push(id);
    },
    setVisibility: function(type, id, x, y, z, visible) {
        const im = this.meshes[type]; if (!im) return;
        const dummy = new THREE.Object3D(); dummy.position.set(x, y, z);
        if (!visible) dummy.scale.set(0, 0, 0);
        dummy.updateMatrix(); im.setMatrixAt(id, dummy.matrix); im.instanceMatrix.needsUpdate = true;
    }
};

function loadTex(url) {
    const t = textureLoader.load(url, ()=>{}, undefined, ()=>{});
    t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.colorSpace = THREE.SRGBColorSpace;
    return t;
}

function getSkinTexture(img, x, y, w, h, isOverlay) {
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!isOverlay) { ctx.fillStyle = '#b98e72'; ctx.fillRect(0, 0, w, h); } else { ctx.clearRect(0, 0, w, h); }
    if (img) { ctx.drawImage(img, x, y, w, h, 0, 0, w, h); } else if (!isOverlay) { ctx.fillStyle = 'rgba(0,0,0,0.1)'; if (Math.random() > 0.5) ctx.fillRect(1, 1, 2, 2); }
    const tex = new THREE.CanvasTexture(canvas); tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter; tex.colorSpace = THREE.SRGBColorSpace; tex.flipY = false; 
    return tex;
}

function getBlockMaterial(type) {
    if(!textures[type]) {
        if(type === 'grass') {
            const side = loadTex(ITEMS.grass.src); const top = loadTex(ASSET_PATH + 'block/grass_block_top.png'); const bot = loadTex(ITEMS.dirt.src);
            textures[type] =[ new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: top, color: 0x7cfc00 }), new THREE.MeshLambertMaterial({ map: bot }), new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: side }) ];
        } else if (type === 'oak_leaves') {
            textures[type] = new THREE.MeshLambertMaterial({ map: loadTex(ITEMS.oak_leaves.src), color: 0x48b518, transparent: true, alphaTest: 0.5 });
        } else if (type === 'glass') {
            textures[type] = new THREE.MeshLambertMaterial({ map: loadTex(ITEMS.glass.src), transparent: true, opacity: 0.6 });
        } else if (type === 'furnace') {
            const front = loadTex(ASSET_PATH + 'block/furnace_front.png'); const side = loadTex(ASSET_PATH + 'block/furnace_side.png'); const top = loadTex(ASSET_PATH + 'block/furnace_top.png');
            textures[type] =[ new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: top }), new THREE.MeshLambertMaterial({ map: top }), new THREE.MeshLambertMaterial({ map: front }), new THREE.MeshLambertMaterial({ map: side }) ];
        } else if (type === 'chest' || type === 'large_chest') {
            const front = loadTex(ASSET_PATH + 'block/chest_front.png'); const top = loadTex(ASSET_PATH + 'block/chest_top.png'); const side = loadTex(ASSET_PATH + 'block/chest_back.png'); 
            textures[type] =[ new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: top }),  new THREE.MeshLambertMaterial({ map: top }), new THREE.MeshLambertMaterial({ map: front }), new THREE.MeshLambertMaterial({ map: side }) ];
        } else if (type === 'oak_log' || type === 'oak_log_tb') {
            const side = loadTex(ITEMS.oak_log.src); const top = loadTex(ITEMS.oak_log_tb.src); 
            textures[type] =[ new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: top }), new THREE.MeshLambertMaterial({ map: top }), new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: side }) ];
        } else if (type === 'crafting_table') {
            const front = loadTex(ASSET_PATH + 'block/crafting_table_front.png'); const side = loadTex(ASSET_PATH + 'block/crafting_table_side.png'); const top = loadTex(ASSET_PATH + 'block/crafting_table_top.png'); const bot = loadTex(ASSET_PATH + 'block/oak_planks.png');
            textures[type] =[ new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: side }), new THREE.MeshLambertMaterial({ map: top }), new THREE.MeshLambertMaterial({ map: bot }), new THREE.MeshLambertMaterial({ map: front }), new THREE.MeshLambertMaterial({ map: side }) ];
        } else if (type === 'fire') {
            fireTexture1 = loadTex(ITEMS.fire.src); fireTexture1.wrapS = fireTexture1.wrapT = THREE.RepeatWrapping; fireTexture1.repeat.set(1, 1/ANIM_FRAMES); 
            fireTexture2 = loadTex(ASSET_PATH + 'block/fire2.png'); fireTexture2.wrapS = fireTexture2.wrapT = THREE.RepeatWrapping; fireTexture2.repeat.set(1, 1/ANIM_FRAMES); 
            fireMaterial = new THREE.MeshBasicMaterial({ map: fireTexture1, transparent: true, side: THREE.DoubleSide, depthWrite: false, alphaTest: 0.5 });
            textures[type] = fireMaterial;
        } else if (type === 'lava' || type === 'lava_flow') {
            const tex = loadTex((type==='lava')?ITEMS.lava.src:ITEMS.lava_flow.src); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(1, 1/ANIM_FRAMES);
            if(type==='lava') lavaSrcTexture = tex; else lavaFlowTexture = tex;
            textures[type] = new THREE.MeshBasicMaterial({ map: tex, color: 0xffffff });
        } else if (type === 'oak_door_b' || type === 'oak_door_top') {
            textures[type] = new THREE.MeshLambertMaterial({ map: loadTex(ITEMS[type].src), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });
        } else if (type === 'oak_trapdoor') {
            textures[type] = new THREE.MeshLambertMaterial({ map: loadTex(ITEMS.oak_trapdoor.src), transparent: true, alphaTest: 0.5 });
        } else {
            const tex = loadTex(ITEMS[type].src);
            textures[type] = type === 'nether_portal' ? new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.75, color: 0xaa00ff, side: THREE.DoubleSide }) : new THREE.MeshLambertMaterial({ map: tex });
        }
    }
    return textures[type];
}

// --- 2. GAME LOGIC ---
let gameMode = 'survival', isFlying = false, lastSpaceTime = 0, isSprinting = false, lastWTime = 0;
let playerHealth = 10, playerMaxY = 0, onGround = false, isDead = false, handSwingTime = 0, handSwingType = 'punch';
let isPaused = false, isTitleScreen = true, isCrouching = false;
let currentEyeHeight = 32; const STAND_HEIGHT = 32, CROUCH_HEIGHT = 24; 

const inventory = new Array(46).fill(null);
let offHandItem = null, cursorItem = null, selectedSlot = 0, isInventoryOpen = false, isRightMouseDown = false;
const paintedSlots = new Set();
let craftingMode = 2, currentChest = null, currentFurnace = null;
const activeFurnaces = new Set();

const SMELT_RECIPES = { 'sand': 'glass', 'cobblestone': 'stone', 'oak_log': 'coal', 'raw_iron': 'iron_ingot', 'iron_ore': 'iron_ingot', 'gold_ore': 'iron_ingot' };
const FUEL_VALUES = { 'coal': 80, 'oak_planks': 15, 'oak_log': 15, 'stick': 5, 'lava_bucket': 1000, 'coal_block': 800 };

function initInventory(mode) {
    for(let i=0; i<46; i++) inventory[i] = null; offHandItem = null;
    if (mode === 'survival') { inventory[0] = { id: 'wooden_pickaxe', count: 1 }; inventory[1] = { id: 'oak_log', count: 16 }; inventory[2] = { id: 'sand', count: 16 }; } 
    renderInventory();
}

function addItemToInventory(id, count) {
    if(gameMode === 'creative') return true; 
    for(let i=0; i<36; i++) {
        if(inventory[i] && inventory[i].id === id && inventory[i].count < 64) {
            const space = 64 - inventory[i].count; const toAdd = Math.min(space, count);
            inventory[i].count += toAdd; count -= toAdd; if(count === 0) { renderInventory(); return true; }
        }
    }
    for(let i=0; i<36; i++) { if(!inventory[i]) { inventory[i] = { id: id, count: count }; renderInventory(); return true; } } return false; 
}

const RECIPES =[
    { pattern: ["L"], keys: {L:'oak_log'}, result: {id:'oak_planks', count:4} },
    { pattern: ["P","P"], keys: {P:'oak_planks'}, result: {id:'stick', count:4} },
    { pattern:["PP","PP"], keys: {P:'oak_planks'}, result: {id:'crafting_table', count:1} },
    { pattern: ["PPP","P P","PPP"], keys: {P:'oak_planks'}, result: {id:'chest', count:1} },
    { pattern:["CCC","C C","CCC"], keys: {C:'cobblestone'}, result: {id:'furnace', count:1} },
    { pattern: ["MMM"," S "," S "], keys: {M:'oak_planks', S:'stick'}, result: {id:'wooden_pickaxe', count:1} },
    { pattern: ["MMM"," S "," S "], keys: {M:'cobblestone', S:'stick'}, result: {id:'stone_pickaxe', count:1} },
    { pattern:["MMM"," S "," S "], keys: {M:'iron_ingot', S:'stick'}, result: {id:'iron_pickaxe', count:1} },
    { pattern: ["MMM"," S "," S "], keys: {M:'diamond', S:'stick'}, result: {id:'diamond_pickaxe', count:1} },
    { pattern: ["MM","MS"," S"], keys: {M:'oak_planks', S:'stick'}, result: {id:'wooden_axe', count:1} },
    { pattern:["MM","MS"," S"], keys: {M:'cobblestone', S:'stick'}, result: {id:'stone_axe', count:1} },
    { pattern: ["MM","MS"," S"], keys: {M:'iron_ingot', S:'stick'}, result: {id:'iron_axe', count:1} },
    { pattern: ["MM","MS"," S"], keys: {M:'diamond', S:'stick'}, result: {id:'diamond_axe', count:1} },
    { pattern: ["M","M","S"], keys: {M:'oak_planks', S:'stick'}, result: {id:'wooden_sword', count:1} },
    { pattern: ["M","M","S"], keys: {M:'cobblestone', S:'stick'}, result: {id:'stone_sword', count:1} },
    { pattern:["M","M","S"], keys: {M:'iron_ingot', S:'stick'}, result: {id:'iron_sword', count:1} },
    { pattern: ["M","M","S"], keys: {M:'diamond', S:'stick'}, result: {id:'diamond_sword', count:1} },
    { pattern: ["M","S","S"], keys: {M:'oak_planks', S:'stick'}, result: {id:'wooden_shovel', count:1} },
    { pattern:["M","S","S"], keys: {M:'cobblestone', S:'stick'}, result: {id:'stone_shovel', count:1} },
    { pattern: ["M","S","S"], keys: {M:'iron_ingot', S:'stick'}, result: {id:'iron_shovel', count:1} },
    { pattern: ["M","S","S"], keys: {M:'diamond', S:'stick'}, result: {id:'diamond_shovel', count:1} },
    { pattern: ["I I"," I "], keys: {I:'iron_ingot'}, result: {id:'bucket', count:1} },
    { pattern: ["I "," F"], keys: {I:'iron_ingot', F:'flint'}, result: {id:'flint_and_steel', count:1} },
    { pattern:["III","III","III"], keys: {I:'iron_ingot'}, result: {id:'iron_block', count:1} },
    { pattern: ["DDD","DDD","DDD"], keys: {D:'diamond'}, result: {id:'diamond_block', count:1} },
    { pattern: ["CCC","CCC","CCC"], keys: {C:'coal'}, result: {id:'coal_block', count:1} },
    { pattern: ["B"], keys: {B:'iron_block'}, result: {id:'iron_ingot', count:9} },
    { pattern: ["B"], keys: {B:'diamond_block'}, result: {id:'diamond', count:9} },
    { pattern: ["B"], keys: {B:'coal_block'}, result: {id:'coal', count:9} },
];

function checkCrafting() {
    if(gameMode === 'creative') return; 
    const width = craftingMode; const gridStart = 36; const grid =[];
    for(let r=0; r<3; r++) {
        const row =[];
        for(let c=0; c<3; c++) {
            if (r < width && c < width) { const idx = gridStart + (r * width) + c; row.push(inventory[idx] ? inventory[idx].id : null); } 
            else row.push(null);
        }
        grid.push(row);
    }
    let minR=3, maxR=-1, minC=3, maxC=-1;
    for(let r=0; r<3; r++) { for(let c=0; c<3; c++) { if(grid[r][c]) { minR = Math.min(minR, r); maxR = Math.max(maxR, r); minC = Math.min(minC, c); maxC = Math.max(maxC, c); } } }
    let match = null;
    if (maxR !== -1) {
        const shapeH = maxR - minR + 1; const shapeW = maxC - minC + 1;
        for(let recipe of RECIPES) {
            const pat = recipe.pattern; const patH = pat.length; const patW = pat[0].length;
            if (patH !== shapeH || patW !== shapeW) continue;
            let valid = true;
            for(let r=0; r<patH; r++) {
                for(let c=0; c<patW; c++) {
                    const gridItem = grid[minR+r][minC+c]; const char = pat[r][c];
                    if (char === ' ') { if (gridItem !== null) valid = false; } 
                    else { const requiredId = recipe.keys[char]; if (gridItem !== requiredId) valid = false; }
                }
            }
            if (valid) { match = recipe.result; break; }
        }
    }
    inventory[45] = match ? { ...match } : null; renderInventory();
}

function consumeIngredients() {
    const end = 36 + (craftingMode * craftingMode);
    for(let i=36; i<end; i++) {
        if (inventory[i]) {
            inventory[i].count--;
            if (inventory[i].count <= 0) inventory[i] = null;
        }
    }
}

function renderInventory() {
    if (gameMode === 'survival') {
        updateGridDOM('main-inv-grid', 9, 36); updateGridDOM('hotbar-inv-grid', 0, 9);
        const craftGrid = document.getElementById('craft-grid');
        if(craftingMode === 2) { craftGrid.className = 'crafting-grid grid-2x2'; updateGridDOM('craft-grid', 36, 40); } 
        else { craftGrid.className = 'crafting-grid grid-3x3'; updateGridDOM('craft-grid', 36, 45); }
        updateGridDOM('craft-output', 45, 46);
    } else { renderCreativeList(); updateGridDOM('creative-hotbar-grid', 0, 9); updateGridDOM('creative-main-grid', 9, 36); }

    if (currentChest) { renderChestGrid(); updateGridDOM('chest-inv-grid', 9, 36); updateGridDOM('chest-hotbar-grid', 0, 9); }
    if (currentFurnace) { renderFurnace(); updateGridDOM('furnace-inv-grid', 9, 36); updateGridDOM('furnace-hotbar-grid', 0, 9); }

    const hudContainer = document.getElementById('hud-hotbar');
    hudContainer.innerHTML = '<div id="offhand-slot-ui"></div>';
    const offUi = document.getElementById('offhand-slot-ui');
    if(offHandItem) {
        offUi.style.display = 'flex'; offUi.innerHTML = `<div class="item-icon" style="background-image: url('${ITEMS[offHandItem.id].src}')"></div><div class="item-count">${offHandItem.count > 1 ? offHandItem.count : ''}</div>`;
    } else { offUi.style.display = 'none'; offUi.innerHTML = ''; }

    for(let i=0; i<9; i++) {
        const item = inventory[i]; const div = document.createElement('div');
        div.className = `hud-slot ${i === selectedSlot ? 'active' : ''}`;
        if(item) div.innerHTML = `<div class="item-count">${item.count > 1 && gameMode !== 'creative' ? item.count : ''}</div>`;
        hudContainer.appendChild(div);
    }
    updateHand(); updateHudMeshes();
    
    const dragDiv = document.getElementById('drag-icon');
    if(cursorItem && cursorItem.count > 0 && gameMode === 'survival') {
        dragDiv.style.display = 'block'; dragDiv.style.backgroundImage = `url('${ITEMS[cursorItem.id].src}')`;
        dragDiv.innerHTML = `<span style="position:absolute;bottom:0;right:0;color:white;font-weight:bold;text-shadow:1px 1px 0 #000">${cursorItem.count}</span>`;
    } else { dragDiv.style.display = 'none'; }
}

function renderFurnace() {
    if(!currentFurnace) return;
    const data = currentFurnace.userData.furnace;
    const slots =[document.getElementById('f-input'), document.getElementById('f-fuel'), document.getElementById('f-output')];
    const items =[data.input, data.fuel, data.output];
    slots.forEach((el, i) => {
        el.innerHTML = ''; const item = items[i];
        if(item) el.innerHTML = `<div class="item-icon" style="background-image: url('${ITEMS[item.id].src}')"></div><div class="item-count">${item.count > 1 ? item.count : ''}</div>`;
        el.onmousedown = (e) => handleFurnaceSlotClick(i, e);
    });
    const flameH = data.maxBurnTime > 0 ? (data.burnTime / data.maxBurnTime) * 100 : 0;
    document.getElementById('f-flame-fill').style.height = flameH + "%";
    document.getElementById('f-arrow-fill').style.width = ((data.cookTime / 10) * 100) + "%";
}

function renderCreativeList() {
    const container = document.getElementById('creative-list');
    const search = document.getElementById('creative-search').value.toLowerCase();
    container.innerHTML = '';
    Object.keys(ITEMS).forEach(key => {
        if(ITEMS[key].name.toLowerCase().includes(search) && !['oak_log_tb','oak_door_top','oak_door_b'].includes(key)) {
            const slotDiv = document.createElement('div'); slotDiv.className = 'slot'; slotDiv.draggable = true;
            slotDiv.innerHTML = `<div class="item-icon" style="background-image: url('${ITEMS[key].src}')"></div>`;
            slotDiv.title = ITEMS[key].name; slotDiv.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', key));
            container.appendChild(slotDiv);
        }
    });
}

function getNeighborChest(obj) {
    if(!obj) return null;
    const x = obj.position.x, y = obj.position.y, z = obj.position.z;
    const dirs =[{x:BLOCK,z:0}, {x:-BLOCK,z:0}, {x:0,z:BLOCK}, {x:0,z:-BLOCK}];
    for(let d of dirs) { const neighbor = worldMap.get(getKey(x+d.x, y, z+d.z)); if(neighbor && neighbor.type === 'chest') return neighbor.mesh; }
    return null;
}

function renderChestGrid() {
    const container = document.getElementById('chest-grid'); container.innerHTML = '';
    const neighbor = getNeighborChest(currentChest);
    let combinedInv =[];
    if(neighbor) {
        container.style.gridTemplateColumns = "repeat(9, 36px)"; container.style.width = (9 * 38) + "px"; 
        document.getElementById('chest-window').className = "window large-window";
        combinedInv =[...currentChest.userData.inventory, ...neighbor.userData.inventory];
    } else {
        container.style.gridTemplateColumns = "repeat(9, 36px)"; document.getElementById('chest-window').className = "window";
        combinedInv = currentChest.userData.inventory;
    }
    for(let i=0; i<combinedInv.length; i++) {
        const item = combinedInv[i]; const slotDiv = document.createElement('div'); slotDiv.className = 'slot';
        slotDiv.addEventListener('mousedown', (e) => handleChestSlotClick(i, e, combinedInv, neighbor));
        if(item) slotDiv.innerHTML = `<div class="item-icon" style="background-image: url('${ITEMS[item.id].src}')"></div><div class="item-count">${item.count > 1 ? item.count : ''}</div>`;
        container.appendChild(slotDiv);
    }
}

document.getElementById('creative-search').addEventListener('input', renderCreativeList);

function updateGridDOM(elementId, startIdx, endIdx) {
    const container = document.getElementById(elementId); container.innerHTML = '';
    for(let i=startIdx; i<endIdx; i++) {
        const item = inventory[i]; const slotDiv = document.createElement('div'); slotDiv.className = 'slot'; slotDiv.dataset.index = i;
        if(gameMode === 'creative' && (elementId === 'creative-hotbar-grid' || elementId === 'creative-main-grid')) {
            slotDiv.addEventListener('dragover', (e) => e.preventDefault());
            slotDiv.addEventListener('drop', (e) => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (id && ITEMS[id]) { inventory[i] = { id: id, count: 1 }; renderInventory(); } });
            slotDiv.addEventListener('contextmenu', (e) => { e.preventDefault(); inventory[i] = null; renderInventory(); });
        } else {
            slotDiv.addEventListener('mousemove', (e) => handleSlotMouseMove(e, i));
            slotDiv.addEventListener('mousedown', (e) => handleSlotClick(i, e));
        }
        slotDiv.addEventListener('mouseleave', () => document.getElementById('tooltip').style.display='none');
        if(item) { slotDiv.innerHTML = `<div class="item-icon" style="background-image: url('${ITEMS[item.id].src}')"></div><div class="item-count">${item.count > 1 && gameMode !== 'creative' ? item.count : ''}</div>`; }
        container.appendChild(slotDiv);
    }
}

document.addEventListener('mousedown', (e) => { if(e.button === 2) isRightMouseDown = true; });
document.addEventListener('mouseup', () => { isRightMouseDown = false; paintedSlots.clear(); });
document.addEventListener('mousemove', (e) => { if(cursorItem) { const d = document.getElementById('drag-icon'); d.style.left = (e.clientX - 16) + 'px'; d.style.top = (e.clientY - 16) + 'px'; } });

function handleSlotMouseMove(e, idx) {
    if (gameMode === 'creative' || currentChest) return; 
    const item = inventory[idx]; const tooltip = document.getElementById('tooltip');
    if(item && !cursorItem) { tooltip.style.display = 'block'; tooltip.style.left = (e.clientX + 15) + 'px'; tooltip.style.top = (e.clientY - 15) + 'px'; tooltip.innerText = ITEMS[item.id].name; } 
    else { tooltip.style.display = 'none'; }

    if(isRightMouseDown && cursorItem && !paintedSlots.has(idx)) {
        const target = inventory[idx];
        if(!target) { inventory[idx] = { ...cursorItem, count: 1 }; cursorItem.count--; paintedSlots.add(idx); } 
        else if (target.id === cursorItem.id && target.count < 64) { target.count++; cursorItem.count--; paintedSlots.add(idx); }
        if(cursorItem.count <= 0) cursorItem = null;
        if(idx >= 36) checkCrafting(); renderInventory();
    }
}

function clickSlotLogic(getFn, setFn, idx, e) {
    const clickedItem = getFn(idx);
    if(cursorItem && !clickedItem) {
        if(e.button === 2) { setFn(idx, { id: cursorItem.id, count: 1 }); cursorItem.count--; if(cursorItem.count === 0) cursorItem = null; } else { setFn(idx, cursorItem); cursorItem = null; }
    } else if(!cursorItem && clickedItem) {
        if(e.button === 2) { const half = Math.ceil(clickedItem.count / 2); cursorItem = { ...clickedItem, count: half }; clickedItem.count -= half; if(clickedItem.count === 0) setFn(idx, null); } else { cursorItem = clickedItem; setFn(idx, null); }
    } else if(cursorItem && clickedItem) {
        if(cursorItem.id === clickedItem.id) {
            if(e.button === 2) { if(clickedItem.count < 64) { clickedItem.count++; cursorItem.count--; if(cursorItem.count === 0) cursorItem = null; } } else { const space = 64 - clickedItem.count; const toAdd = Math.min(space, cursorItem.count); clickedItem.count += toAdd; cursorItem.count -= toAdd; if(cursorItem.count === 0) cursorItem = null; }
        } else { const temp = clickedItem; setFn(idx, cursorItem); cursorItem = temp; }
    }
}

function handleSlotClick(idx, e) {
    if (gameMode === 'creative') return; 
    if(idx === 45) { 
        const clickedItem = inventory[45];
        if(clickedItem) {
            if (e.shiftKey) {
                while(true) { if (!addItemToInventory(clickedItem.id, clickedItem.count)) break; consumeIngredients(); checkCrafting(); if (!inventory[45]) break; }
            } else {
                if(!cursorItem) { cursorItem = { ...clickedItem }; consumeIngredients(); checkCrafting(); } else if (cursorItem.id === clickedItem.id && cursorItem.count + clickedItem.count <= 64) { cursorItem.count += clickedItem.count; consumeIngredients(); checkCrafting(); }
            }
        }
        renderInventory(); return;
    }
    clickSlotLogic((i)=>inventory[i], (i,v)=>inventory[i]=v, idx, e);
    if(idx >= 36) checkCrafting(); renderInventory();
}

function handleChestSlotClick(idx, e, combinedArray, neighbor) {
    if(!currentChest) return;
    const isSecondChest = idx >= 27; const targetInv = isSecondChest ? neighbor.userData.inventory : currentChest.userData.inventory; const targetIdx = isSecondChest ? idx - 27 : idx;
    clickSlotLogic(() => targetInv[targetIdx], (i, v) => targetInv[targetIdx] = v, idx, e); renderInventory(); 
}

function handleFurnaceSlotClick(idx, e) {
    if(!currentFurnace) return;
    const data = currentFurnace.userData.furnace; const keys = ['input', 'fuel', 'output']; const key = keys[idx];
    if (idx === 2) {
        if(data.output) {
            if(!cursorItem) { cursorItem = data.output; data.output = null; }
            else if(cursorItem.id === data.output.id) { const space = 64 - cursorItem.count; const toTake = Math.min(space, data.output.count); cursorItem.count += toTake; data.output.count -= toTake; if(data.output.count <= 0) data.output = null; }
        }
        renderInventory(); return;
    }
    clickSlotLogic(() => data[key], (i, v) => data[key] = v, idx, e); renderInventory();
}

// --- 3. 3D GAME & WORLD ---
let camera, scene, renderer, controls;
let hudScene, hudCamera, hudMeshes = [];
let handMesh, offHandMesh, highlightMesh;
const objects =[]; const worldMap = new Map(); const droppedItems =[];
let moveForward=false, moveBackward=false, moveLeft=false, moveRight=false, moveUp=false, moveDown=false, canJump=false;
let prevTime = performance.now(); const velocity = new THREE.Vector3(); const playerDimensions = { w: 10, h: 32 }; 

function createPlayerModel() {
    if(playerGroup) controls.getObject().remove(playerGroup);
    playerGroup = new THREE.Group();
    const s = 1.125, os = 1.125 * 1.05; const is64x64 = userSkinImage && userSkinImage.height === 64;
    const mkPart = (w, h, d, u, v, isOverlay) => {
        const scale = isOverlay ? os : s;
        const mats =[
            new THREE.MeshLambertMaterial({ map: getSkinTexture(userSkinImage, u+d+w, v+d, d, h, isOverlay), transparent: true, side: THREE.DoubleSide, alphaTest: isOverlay ? 0.1 : 0 }),
            new THREE.MeshLambertMaterial({ map: getSkinTexture(userSkinImage, u, v+d, d, h, isOverlay), transparent: true, side: THREE.DoubleSide, alphaTest: isOverlay ? 0.1 : 0 }),
            new THREE.MeshLambertMaterial({ map: getSkinTexture(userSkinImage, u+d, v, w, d, isOverlay), transparent: true, side: THREE.DoubleSide, alphaTest: isOverlay ? 0.1 : 0 }),
            new THREE.MeshLambertMaterial({ map: getSkinTexture(userSkinImage, u+d+w, v, w, d, isOverlay), transparent: true, side: THREE.DoubleSide, alphaTest: isOverlay ? 0.1 : 0 }),
            new THREE.MeshLambertMaterial({ map: getSkinTexture(userSkinImage, u+d, v+d, w, h, isOverlay), transparent: true, side: THREE.DoubleSide, alphaTest: isOverlay ? 0.1 : 0 }),
            new THREE.MeshLambertMaterial({ map: getSkinTexture(userSkinImage, u+d+w+d, v+d, w, h, isOverlay), transparent: true, side: THREE.DoubleSide, alphaTest: isOverlay ? 0.1 : 0 })
        ];
        return new THREE.Mesh(new THREE.BoxGeometry(w * scale, h * scale, d * scale), mats);
    };

    playerHead = new THREE.Group(); playerHead.add(mkPart(8, 8, 8, 0, 0, false)); playerHead.add(mkPart(8, 8, 8, 32, 0, true)); playerHead.position.set(0, 28 * s, 0);
    playerBody = new THREE.Group(); playerBody.add(mkPart(8, 12, 4, 16, 16, false)); if (is64x64) playerBody.add(mkPart(8, 12, 4, 16, 32, true)); playerBody.position.y = 18 * s;
    rightArm = new THREE.Group(); rightArm.add(mkPart(4, 12, 4, 40, 16, false)); if (is64x64) rightArm.add(mkPart(4, 12, 4, 40, 32, true)); rightArm.position.set(-6 * s, 18 * s, 0);
    leftArm = new THREE.Group(); if (is64x64) { leftArm.add(mkPart(4, 12, 4, 32, 48, false)); leftArm.add(mkPart(4, 12, 4, 48, 48, true)); } else { leftArm.add(mkPart(4, 12, 4, 40, 16, false)); } leftArm.position.set(6 * s, 18 * s, 0);
    rightLeg = new THREE.Group(); rightLeg.add(mkPart(4, 12, 4, 0, 16, false)); if (is64x64) rightLeg.add(mkPart(4, 12, 4, 0, 32, true)); rightLeg.position.set(-2 * s, 6 * s, 0);
    leftLeg = new THREE.Group(); if (is64x64) { leftLeg.add(mkPart(4, 12, 4, 16, 48, false)); leftLeg.add(mkPart(4, 12, 4, 0, 48, true)); } else { leftLeg.add(mkPart(4, 12, 4, 0, 16, false)); } leftLeg.position.set(2 * s, 6 * s, 0);
    
    playerGroup.add(playerHead, playerBody, rightArm, leftArm, rightLeg, leftLeg); playerGroup.position.set(0, 0, 0); playerGroup.visible = (viewMode !== 0); 
    controls.getObject().add(playerGroup);
}

init();
animate();

function init() {
    scene = new THREE.Scene(); scene.background = new THREE.Color(0x87CEEB); scene.fog = new THREE.Fog(0x87CEEB, 20, 300); 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); camera.position.set(0, 32, 0);

    hudScene = new THREE.Scene(); hudCamera = new THREE.OrthographicCamera( -window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 1, 1000 ); hudCamera.position.z = 100;
    const hudLight = new THREE.DirectionalLight(0xffffff, 1.2); hudLight.position.set(100, 100, 100); hudScene.add(hudLight); hudScene.add(new THREE.AmbientLight(0xffffff, 0.8));

    handMesh = new THREE.Group(); camera.add(handMesh); handMesh.position.set(0.6, -0.3, -0.8); handMesh.rotation.set(0.2, -0.2, 0);
    offHandMesh = new THREE.Group(); camera.add(offHandMesh); offHandMesh.position.set(-0.6, -0.3, -0.8); offHandMesh.rotation.set(0.2, 0.2, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6)); const dirLight = new THREE.DirectionalLight(0xffffff, 1.0); dirLight.position.set(100, 200, 100); scene.add(dirLight);

    renderer = new THREE.WebGLRenderer({ antialias: false }); renderer.setSize(window.innerWidth, window.innerHeight); 
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.autoClear = false; document.body.appendChild(renderer.domElement);

    controls = new PointerLockControls(camera, document.body); createPlayerModel();

    const hSrc = ASSET_PATH + "gui/heart.png"; const fSrc = ASSET_PATH + "gui/food.png";
    const hc = document.getElementById('hearts-container'); const fc = document.getElementById('food-container');
    for(let i=0; i<10; i++) { hc.innerHTML += `<div class='stat-icon' style='background-image:url(${hSrc})'></div>`; fc.innerHTML += `<div class='stat-icon' style='background-image:url(${fSrc})'></div>`; }
    
    document.getElementById('skin-input').addEventListener('change', (e) => {
        const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
        reader.onload = (evt) => { const img = new Image(); img.onload = () => { userSkinImage = img; document.getElementById('skin-preview').style.display = 'block'; document.getElementById('skin-preview').style.backgroundImage = `url('${evt.target.result}')`; updateHand(); createPlayerModel(); }; img.src = evt.target.result; };
        reader.readAsDataURL(file);
    });

    const gmBtn = document.getElementById('btn-gamemode');
    gmBtn.addEventListener('click', () => { const desc = document.getElementById('gamemode-desc'); if(gmBtn.innerText.includes('Survival')) { gmBtn.innerText = 'Game Mode: Creative'; desc.innerText = 'Unlimited resources, free flying and destroy blocks instantly'; gameMode = 'creative'; } else { gmBtn.innerText = 'Game Mode: Survival'; desc.innerText = 'Search for resources, craft, gain levels, health and hunger'; gameMode = 'survival'; } });
    document.getElementById('btn-create-world').addEventListener('click', () => { localStorage.removeItem('mc_save_v1'); startGame(gameMode); });
    document.getElementById('btn-cancel-world').addEventListener('click', () => alert("Cannot cancel in this demo. Please Create New World."));
    document.getElementById('btn-resume').addEventListener('click', () => { document.getElementById('pause-menu').style.display = 'none'; if (!document.pointerLockElement) controls.lock(); });
    document.getElementById('btn-save-quit').addEventListener('click', () => { saveGame(); location.reload(); });
    document.getElementById('btn-options').addEventListener('click', () => { document.getElementById('pause-menu').style.display = 'none'; document.getElementById('options-screen').style.display = 'flex'; });
    document.getElementById('btn-options-done').addEventListener('click', () => { document.getElementById('options-screen').style.display = 'none'; document.getElementById('pause-menu').style.display = 'flex'; });
    document.getElementById('btn-toggle-fps').addEventListener('click', (e) => { showFPS = !showFPS; e.target.innerText = `Show FPS: ${showFPS ? 'ON' : 'OFF'}`; document.getElementById('fps-display').style.display = showFPS ? 'block' : 'none'; });
    document.getElementById('btn-limit-fps').addEventListener('click', (e) => { if(limitFPS === 0) limitFPS = 30; else if(limitFPS === 30) limitFPS = 60; else if(limitFPS === 60) limitFPS = 120; else limitFPS = 0; e.target.innerText = `Max FPS: ${limitFPS === 0 ? 'Unlimited' : limitFPS}`; });
    document.getElementById('btn-chat-key').addEventListener('click', (e) => { e.target.innerText = 'Press Key...'; e.target.classList.add('listening'); isSettingChatKey = true; });
    document.getElementById('btn-respawn').addEventListener('click', respawn); document.getElementById('btn-death-quit').addEventListener('click', () => location.reload());

    controls.addEventListener('lock', () => {
        if(!isChatOpen) {
            isPaused = false; prevTime = performance.now();
            document.getElementById('title-screen').style.display = 'none'; document.getElementById('pause-menu').style.display = 'none'; document.getElementById('inventory-screen').style.display = 'none'; document.getElementById('creative-screen').style.display = 'none'; document.getElementById('chest-screen').style.display = 'none'; document.getElementById('furnace-screen').style.display = 'none'; document.getElementById('options-screen').style.display = 'none';
            if(!isDead) document.getElementById('hud').style.display = 'block'; isInventoryOpen = false; currentChest = null; currentFurnace = null;
        }
    });
    controls.addEventListener('unlock', () => {
        if(isTitleScreen) return;
        if(!isInventoryOpen && !isDead && !currentChest && !currentFurnace && !isChatOpen) { isPaused = true; document.getElementById('pause-menu').style.display = 'flex'; document.getElementById('hud').style.display = 'none'; }
    });
    scene.add(controls.getObject());
    document.addEventListener('keydown', onKeyDown); document.addEventListener('keyup', onKeyUp); document.addEventListener('mousedown', onMouseClick); document.addEventListener('wheel', onScroll);

    highlightMesh = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(BLOCK+0.2, BLOCK+0.2, BLOCK+0.2)), new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })); scene.add(highlightMesh);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
        hudCamera.left = -window.innerWidth / 2; hudCamera.right = window.innerWidth / 2; hudCamera.top = window.innerHeight / 2; hudCamera.bottom = -window.innerHeight / 2; hudCamera.updateProjectionMatrix(); updateHudMeshes();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function updateHudMeshes() {
    hudMeshes.forEach(m => hudScene.remove(m)); hudMeshes =[];
    const slotWidth = 42, startX = -((9 * slotWidth) / 2) + (slotWidth/2), yPos = -window.innerHeight / 2 + 30;
    for(let i=0; i<9; i++) {
        const item = inventory[i];
        if(item) {
            let mesh = buildItemMesh(item); mesh.scale.set(40, 40, 40); 
            if(ITEMS[item.id].block) { mesh.rotation.x = Math.PI / 6; mesh.rotation.y = Math.PI / 4; } else { mesh.rotation.x = 0; mesh.rotation.y = 0; }
            mesh.position.set(startX + (i * slotWidth), yPos, 0); hudScene.add(mesh); hudMeshes.push(mesh);
        }
    }
}

function saveGame() {
    const worldData = [];
    for (const [key, val] of worldMap.entries()) {
        const o = { k: key, type: val.type, x: val.x, y: val.y, z: val.z };
        if(!val.isInstanced && val.mesh) {
            if(val.mesh.userData.inventory) o.inv = val.mesh.userData.inventory; if(val.mesh.userData.furnace) o.furnace = val.mesh.userData.furnace;
            o.isOpen = val.mesh.userData.isOpen || false; o.rot = val.mesh.rotation.y;
        }
        worldData.push(o);
    }
    const saveState = { player: { pos: controls.getObject().position, rot: controls.getObject().rotation, health: playerHealth, mode: gameMode, username: username }, settings: { chatKey: chatKey }, inventory: inventory, offHand: offHandItem, world: worldData };
    localStorage.setItem('mc_save_v1', JSON.stringify(saveState));
}

function loadGame() {
    const data = localStorage.getItem('mc_save_v1'); if (!data) return false;
    const state = JSON.parse(data);
    controls.getObject().position.copy(state.player.pos); controls.getObject().rotation.copy(state.player.rot); playerHealth = state.player.health; gameMode = state.player.mode;
    if(state.player.username) username = state.player.username; if(state.settings && state.settings.chatKey) chatKey = state.settings.chatKey;
    document.getElementById('btn-chat-key').innerText = `Chat Key: ${chatKey.replace('Key','')}`;
    for(let i=0; i<46; i++) inventory[i] = state.inventory[i]; offHandItem = state.offHand; renderInventory();

    objects.forEach(o => { scene.remove(o); if(o.geometry && o.geometry !== boxGeometry && o.geometry !== planeGeometry) o.geometry.dispose(); });
    objects.length = 0; worldMap.clear(); activeFurnaces.clear();
    Object.values(imManager.meshes).forEach(im => { scene.remove(im); im.dispose(); }); imManager.meshes={}; imManager.freeIds={}; imManager.counts={};

    state.world.forEach(b => {
        if(b.type === 'oak_door_bottom') b.type = 'oak_door_b';
        placeBlock(b.x, b.y, b.z, b.type, undefined, b.rot);
        const obj = worldMap.get(getKey(b.x, b.y, b.z));
        if(obj && !obj.isInstanced && obj.mesh) {
            if (b.inv) obj.mesh.userData.inventory = b.inv;
            if (b.furnace) { obj.mesh.userData.furnace = b.furnace; activeFurnaces.add(obj.mesh); }
            if (b.isOpen && (b.type.includes('door') || b.type.includes('trapdoor'))) {
                obj.mesh.userData.isOpen = true;
                if (b.type === 'oak_trapdoor') { obj.mesh.rotation.x = -Math.PI/2; obj.mesh.position.y += BLOCK*0.4; } else { obj.mesh.rotation.y = Math.PI/2; obj.mesh.position.x = obj.mesh.userData.baseX + BLOCK*0.4; obj.mesh.position.z = obj.mesh.userData.baseZ + BLOCK*0.4; }
            }
        }
    }); return true;
}

function buildItemMesh(item) {
    const info = ITEMS[item.id]; let mesh;
    if(info.block && item.id !== 'oak_door' && item.id !== 'oak_trapdoor') {
        if(item.id === 'fire') { mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), getBlockMaterial('fire')); mesh.rotation.y = Math.PI/4; } 
        else mesh = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), getBlockMaterial(item.id));
    } else {
        const tex = loadTex(item.id === 'oak_trapdoor' ? ITEMS.oak_trapdoor.src : info.src);
        mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide })); mesh.rotation.y = Math.PI / 4;
    }
    return mesh;
}

function updateHand() {
    while(handMesh.children.length > 0) handMesh.remove(handMesh.children[0]);
    while(offHandMesh.children.length > 0) offHandMesh.remove(offHandMesh.children[0]);
    const item = inventory[selectedSlot];
    if(item) { handMesh.add(buildItemMesh(item)); } else {
        const armGeo = new THREE.BoxGeometry(0.35, 1.1, 0.35);
        const materials =[ new THREE.MeshBasicMaterial({ map: getSkinTexture(userSkinImage, 52, 20, 4, 12) }), new THREE.MeshBasicMaterial({ map: getSkinTexture(userSkinImage, 44, 20, 4, 12) }), new THREE.MeshBasicMaterial({ map: getSkinTexture(userSkinImage, 44, 16, 4, 4) }), new THREE.MeshBasicMaterial({ map: getSkinTexture(userSkinImage, 48, 16, 4, 4) }), new THREE.MeshBasicMaterial({ map: getSkinTexture(userSkinImage, 40, 20, 4, 12) }), new THREE.MeshBasicMaterial({ map: getSkinTexture(userSkinImage, 48, 20, 4, 12) }) ];
        const mesh = new THREE.Mesh(armGeo, materials); mesh.rotation.x = -Math.PI / 4; mesh.rotation.y = Math.PI / 12; mesh.position.set(0.2, -0.4, 0.4); handMesh.add(mesh);
    }
    if(offHandItem) { const mesh = buildItemMesh(offHandItem); if (!ITEMS[offHandItem.id].block || offHandItem.id === 'oak_door' || offHandItem.id === 'oak_trapdoor') mesh.rotation.y = -Math.PI / 4; offHandMesh.add(mesh); }
}

async function startGame(mode) {
    isTitleScreen = false; gameMode = mode; isFlying = false; isDead = false;
    const userIn = document.getElementById('username-input').value.trim(); if (userIn) username = userIn;
    document.getElementById('death-screen').style.display = 'none'; document.getElementById('status-bars').style.opacity = mode === 'creative' ? '0' : '1'; document.getElementById('xp-bar-bg').style.opacity = mode === 'creative' ? '0' : '1';
    
    if (!loadGame()) {
        initInventory(mode); playerHealth = 10; updateHearts(); await generateWorld();
        const spawnH = pseudoNoise(0, 0); controls.getObject().position.set(0, (spawnH * BLOCK) + BLOCK + 5, 0);
    } else updateHearts();
    updateHand(); createPlayerModel(); if (!document.pointerLockElement) controls.lock();
}

function respawn() { isDead = false; playerHealth = 10; updateHearts(); document.getElementById('death-screen').style.display = 'none'; document.getElementById('hud').style.display = 'block'; velocity.set(0, 0, 0); controls.getObject().position.set(0, 80, 0); playerMaxY = 80; if (!document.pointerLockElement) controls.lock(); }
function showDeathScreen() { isDead = true; controls.unlock(); document.getElementById('death-screen').style.display = 'flex'; document.getElementById('hud').style.display = 'none'; }
function damagePlayer(amount) { if(gameMode === 'creative') return; playerHealth -= amount; updateHearts(); if (playerHealth <= 0) { showDeathScreen(); } else { document.body.style.background = "#ff0000"; setTimeout(()=>document.body.style.background = "#222", 100); } }
function updateHearts() { const hc = document.getElementById('hearts-container'); hc.innerHTML = ''; for(let i=0; i<Math.ceil(playerHealth); i++) hc.innerHTML += `<div class='stat-icon' style='background-image:url(${ASSET_PATH}gui/heart.png)'></div>`; }

function addChatMessage(msg) { const div = document.createElement('div'); div.className = 'chat-msg'; div.innerText = msg; const history = document.getElementById('chat-history'); history.appendChild(div); activeChatMessages.push({ el: div, time: Date.now() }); if (history.children.length > 20) { history.removeChild(history.children[0]); if (activeChatMessages[0] && activeChatMessages[0].el === history.children[0]) activeChatMessages.shift(); } history.scrollTop = history.scrollHeight; }
function toggleChat() { const inputLine = document.getElementById('chat-input-line'); const input = document.getElementById('chat-input'); if(isChatOpen) { isChatOpen = false; inputLine.style.display = 'none'; input.blur(); controls.lock(); } else { isChatOpen = true; controls.unlock(); inputLine.style.display = 'flex'; input.value = ''; input.focus(); } }

function pseudoNoise(x, z) { return Math.sin(x / 60) * 10 + Math.cos(z / 60) * 10 + Math.sin(x/15 + z/15)*3; }

function checkVisibility(x, y, z) {
    const keys =[ getKey(x+BLOCK, y, z), getKey(x-BLOCK, y, z), getKey(x, y+BLOCK, z), getKey(x, y-BLOCK, z), getKey(x, y, z+BLOCK), getKey(x, y, z-BLOCK) ];
    for(let k of keys) { const n = worldMap.get(k); if (!n) return true; const info = ITEMS[n.type]; if (info.transparent || !info.block) return true; } return false;
}

function updateBlockAndNeighborsVisibility(x, y, z) {
    const target = worldMap.get(getKey(x, y, z));
    if(target) { const isVis = checkVisibility(x, y, z); if (target.isInstanced) imManager.setVisibility(target.type, target.instanceId, target.x, target.y, target.z, isVis); else target.mesh.visible = isVis; }
    const offsets =[ {x:BLOCK,y:0,z:0}, {x:-BLOCK,y:0,z:0}, {x:0,y:BLOCK,z:0}, {x:0,y:-BLOCK,z:0}, {x:0,y:0,z:BLOCK}, {x:0,y:0,z:-BLOCK} ];
    for(let o of offsets) {
        const n = worldMap.get(getKey(x+o.x, y+o.y, z+o.z));
        if(n) { const nVis = checkVisibility(n.x, n.y, n.z); if (n.isInstanced) imManager.setVisibility(n.type, n.instanceId, n.x, n.y, n.z, nVis); else n.mesh.visible = nVis; }
    }
}

async function generateWorld() {
    const loadingScreen = document.getElementById('loading-screen'); const loadingBar = document.getElementById('loading-bar-fill'); loadingScreen.style.display = 'flex';
    objects.forEach(o => { scene.remove(o); if(o.geometry && o.geometry !== boxGeometry && o.geometry !== planeGeometry) o.geometry.dispose(); });
    objects.length = 0; worldMap.clear(); activeFurnaces.clear();
    Object.values(imManager.meshes).forEach(im => { scene.remove(im); im.dispose(); }); imManager.meshes={}; imManager.freeIds={}; imManager.counts={};

    const range = 20; const totalRows = range * 2; let rowsProcessed = 0;
    for(let x=-range; x<range; x++) {
        if (rowsProcessed % 2 === 0) { await new Promise(r => setTimeout(r, 0)); loadingBar.style.width = Math.round((rowsProcessed / totalRows) * 100) + "%"; }
        rowsProcessed++;
        for(let z=-range; z<range; z++) {
            const wx = x*BLOCK, wz = z*BLOCK, h = Math.floor(pseudoNoise(x, z)), surfaceY = h * BLOCK;
            let topBlock = 'grass', midBlock = 'dirt'; if (h < -2) { topBlock = 'sand'; midBlock = 'sand'; }
            placeBlock(wx, surfaceY, wz, topBlock); placeBlock(wx, surfaceY - BLOCK, wz, midBlock);
            for(let d=2; d<8; d++) { let type = 'stone'; if(Math.random() < 0.05) type = 'coal_ore'; if(d > 4 && Math.random() < 0.03) type = 'iron_ore'; placeBlock(wx, surfaceY - (d*BLOCK), wz, type); }
            placeBlock(wx, -120, wz, 'obsidian'); 
            if (topBlock === 'grass' && Math.random() < 0.015 && x > -range+2 && x < range-2 && z > -range+2 && z < range-2) placeTree(wx, surfaceY + BLOCK, wz);
        }
    }
    for (const val of worldMap.values()) {
        const isVis = checkVisibility(val.x, val.y, val.z);
        if (val.isInstanced) imManager.setVisibility(val.type, val.instanceId, val.x, val.y, val.z, isVis); else val.mesh.visible = isVis;
    }
    loadingScreen.style.display = 'none';
}

function placeTree(x, y, z) {
    for(let i=0; i<5; i++) placeBlock(x, y + (i*BLOCK), z, 'oak_log');
    for(let lx=-2; lx<=2; lx++) { for(let lz=-2; lz<=2; lz++) { for(let ly=2; ly<=4; ly++) { if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && Math.random() < 0.4) continue; if (lx===0 && lz===0 && ly<4) continue; placeBlock(x+(lx*BLOCK), y+(ly*BLOCK), z+(lz*BLOCK), 'oak_leaves'); } } }
    placeBlock(x, y + (5*BLOCK), z, 'oak_leaves'); 
}

function getKey(x, y, z) { return `${Math.round(x)},${Math.round(y)},${Math.round(z)}`; }

function placeBlock(x, y, z, type, level, rotation) {
    const key = getKey(x, y, z);
    if(worldMap.has(key)) removeBlockFromData(worldMap.get(key));

    const flowLevel = level !== undefined ? level : 0;
    const isInstanced = SIMPLE_BLOCKS.has(type);
    
    if (isInstanced) {
        const instanceId = imManager.add(type, x, y, z);
        worldMap.set(key, { type: type, isInstanced: true, instanceId: instanceId, x:x, y:y, z:z, level: flowLevel });
    } else {
        let mesh; let mat = getBlockMaterial(type);
        if (type === 'fire') { mesh = new THREE.Group(); const m1 = new THREE.Mesh(planeGeometry, mat); m1.rotation.y = Math.PI/4; const m2 = new THREE.Mesh(planeGeometry, mat); m2.rotation.y = -Math.PI/4; mesh.add(m1, m2); mesh.position.set(x, y, z); mesh.userData = { type: type, health: 2 }; } 
        else if (type === 'oak_door_b' || type === 'oak_door_top') { mesh = new THREE.Mesh(new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK * 0.2), mat); mesh.position.set(x, y, z - (BLOCK*0.4)); mesh.userData = { type: type, isOpen: false, baseZ: z - (BLOCK*0.4), baseX: x }; } 
        else if (type === 'oak_trapdoor') { mesh = new THREE.Mesh(new THREE.BoxGeometry(BLOCK, BLOCK * 0.2, BLOCK), mat); mesh.position.set(x, y - (BLOCK*0.4), z); mesh.userData = { type: type, isOpen: false }; } 
        else if (type === 'nether_portal') { mesh = new THREE.Mesh(new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK*0.1), mat); mesh.position.set(x, y, z); mesh.userData = { type: type }; } 
        else {
            let geo = boxGeometry; if (type === 'lava' || type === 'lava_flow') geo = new THREE.BoxGeometry(BLOCK, BLOCK * (flowLevel===0?1:0.5), BLOCK);
            mesh = new THREE.Mesh(geo, mat);
            if(type.includes('lava')) mesh.position.set(x, y - (BLOCK/2) + (geo.parameters.height/2), z); else mesh.position.set(x, y, z);
            if (rotation !== undefined && (type === 'furnace' || type === 'chest')) mesh.rotation.y = rotation;
            mesh.userData = { type: type }; mesh.matrixAutoUpdate = false; mesh.updateMatrix();
            if (type === 'chest') mesh.userData.inventory = new Array(27).fill(null);
            if (type === 'furnace') { mesh.userData.furnace = { input: null, fuel: null, output: null, cookTime: 0, burnTime: 0, maxBurnTime: 0 }; activeFurnaces.add(mesh); }
        }
        scene.add(mesh); objects.push(mesh);
        worldMap.set(key, { type: type, isInstanced: false, mesh: mesh, x:x, y:y, z:z, level: flowLevel });
    }

    if (type === 'fire') checkPortal(x, y, z);
    if (!document.getElementById('loading-screen').style.display.includes('flex')) updateBlockAndNeighborsVisibility(x, y, z);
}

function checkPortal(x, y, z) {
    const below = worldMap.get(getKey(x, y - BLOCK, z)); if (!below || below.type !== 'obsidian') return;
    const dirs =[{dx: 1, dz: 0}, {dx: 0, dz: 1}];
    for (let dir of dirs) {
        let minX = 0, maxX = 0;
        for(let i=1; i<20; i++) { const b = worldMap.get(getKey(x - (i*dir.dx*BLOCK), y, z - (i*dir.dz*BLOCK))); if(b && b.type === 'obsidian') { minX = i; break; } if(b && b.type !== 'fire' && b.type !== 'air') break; }
        for(let i=1; i<20; i++) { const b = worldMap.get(getKey(x + (i*dir.dx*BLOCK), y, z + (i*dir.dz*BLOCK))); if(b && b.type === 'obsidian') { maxX = i; break; } if(b && b.type !== 'fire' && b.type !== 'air') break; }
        if (minX > 0 && maxX > 0 && (minX + maxX - 1) >= 2) {
            let validHeight = 0;
            for(let h=1; h<20; h++) {
                const leftP = worldMap.get(getKey(x - (minX*dir.dx*BLOCK), y + (h*BLOCK), z - (minX*dir.dz*BLOCK))); const rightP = worldMap.get(getKey(x + (maxX*dir.dx*BLOCK), y + (h*BLOCK), z + (maxX*dir.dz*BLOCK)));
                if(leftP && leftP.type === 'obsidian' && rightP && rightP.type === 'obsidian') {
                    let isTop = true; for(let i=-(minX-1); i<maxX; i++) { const b = worldMap.get(getKey(x + (i*dir.dx*BLOCK), y + (h*BLOCK), z + (i*dir.dz*BLOCK))); if (!b || b.type !== 'obsidian') { isTop = false; break; } }
                    if (isTop) { validHeight = h; break; }
                } else if (!leftP || leftP.type !== 'obsidian' || !rightP || rightP.type !== 'obsidian') break;
            }
            if (validHeight >= 3) {
                for(let h=0; h<validHeight; h++) {
                    for(let i=-(minX-1); i<maxX; i++) {
                        const px = x + (i*dir.dx*BLOCK), py = y + (h*BLOCK), pz = z + (i*dir.dz*BLOCK), k = getKey(px, py, pz);
                        if (!worldMap.has(k) || worldMap.get(k).type === 'fire') { placeBlock(px, py, pz, 'nether_portal'); if(dir.dx === 0 && !worldMap.get(k).isInstanced) worldMap.get(k).mesh.rotation.y = Math.PI/2; }
                    }
                } return; 
            }
        }
    }
}

function removeBlockFromData(blockData) {
    if (!blockData) return;
    const px = blockData.x, py = blockData.y, pz = blockData.z, type = blockData.type;
    
    if (blockData.isInstanced) { imManager.remove(type, blockData.instanceId); } 
    else {
        const target = blockData.mesh; scene.remove(target);
        if(target.geometry && target.geometry !== boxGeometry && target.geometry !== planeGeometry) target.geometry.dispose();
        const idx = objects.indexOf(target); if(idx > -1) objects.splice(idx, 1); activeFurnaces.delete(target);
    }
    worldMap.delete(getKey(px, py, pz));

    if(gameMode === 'survival') {
        const dropPos = new THREE.Vector3(px, py, pz); const vel = new THREE.Vector3((Math.random()-0.5)*10, 20, (Math.random()-0.5)*10);
        let dropId = type; if(type==='stone') dropId='cobblestone'; if(type==='coal_ore') dropId='coal'; if(type==='iron_ore') dropId='raw_iron'; if(type==='diamond_ore') dropId='diamond'; if(type==='grass') dropId='dirt'; if(type==='oak_door_top' || type==='oak_door_b') dropId='oak_door'; if(type==='oak_log_tb') dropId='oak_log';
        if(dropId && ITEMS[dropId]) droppedItems.push(new DroppedItem(dropId, 1, dropPos, vel));
        if (!blockData.isInstanced && blockData.mesh) {
            const target = blockData.mesh;
            if(target.userData.inventory) target.userData.inventory.forEach(i => { if(i) droppedItems.push(new DroppedItem(i.id, i.count, dropPos, vel.clone())); });
            if(target.userData.furnace) { const f = target.userData.furnace; if(f.input) droppedItems.push(new DroppedItem(f.input.id, f.input.count, dropPos, vel.clone())); if(f.fuel) droppedItems.push(new DroppedItem(f.fuel.id, f.fuel.count, dropPos, vel.clone())); if(f.output) droppedItems.push(new DroppedItem(f.output.id, f.output.count, dropPos, vel.clone())); }
        }
    }
    updateBlockAndNeighborsVisibility(px, py, pz); checkGravityTrigger(px, py + BLOCK, pz);
}

function checkGravityTrigger(x, y, z) {
    const block = worldMap.get(getKey(x, y, z));
    if (block && ITEMS[block.type].gravity && !worldMap.has(getKey(x, y - BLOCK, z))) {
        removeBlockFromData(block); const fallItem = new DroppedItem(block.type, 1, new THREE.Vector3(x, y, z), new THREE.Vector3(0,0,0)); fallItem.isFallingBlock = true; droppedItems.push(fallItem);
    }
}

// CUSTOM NATIVE RAYCASTER (Ultra-fast, doesn't use massive Three.js graph logic)
function customRaycast(raycaster, maxDist) {
    const origin = raycaster.ray.origin; const dir = raycaster.ray.direction;
    let closestHit = null; let minDist = maxDist;
    const minX = Math.floor((origin.x - maxDist)/BLOCK), maxX = Math.ceil((origin.x + maxDist)/BLOCK);
    const minY = Math.floor((origin.y - maxDist)/BLOCK), maxY = Math.ceil((origin.y + maxDist)/BLOCK);
    const minZ = Math.floor((origin.z - maxDist)/BLOCK), maxZ = Math.ceil((origin.z + maxDist)/BLOCK);
    const dummyBox = new THREE.Box3();
    
    for(let x = minX; x <= maxX; x++) {
        for(let y = minY; y <= maxY; y++) {
            for(let z = minZ; z <= maxZ; z++) {
                const blockData = worldMap.get(getKey(x*BLOCK, y*BLOCK, z*BLOCK));
                if (blockData) {
                    if (['lava','lava_flow','fire','nether_portal','air'].includes(blockData.type)) continue;
                    
                    if (!blockData.isInstanced && (blockData.type.includes('door') || blockData.type === 'oak_trapdoor')) {
                        const isOpen = blockData.mesh.userData.isOpen; if (isOpen) continue;
                        if (blockData.type === 'oak_trapdoor') { dummyBox.min.set(blockData.x - BLOCK/2, blockData.y - BLOCK/2, blockData.z - BLOCK/2); dummyBox.max.set(blockData.x + BLOCK/2, blockData.y - BLOCK/2 + (BLOCK*0.2), blockData.z + BLOCK/2); } 
                        else { dummyBox.min.set(blockData.x - BLOCK/2, blockData.y - BLOCK/2, blockData.z - BLOCK/2); dummyBox.max.set(blockData.x + BLOCK/2, blockData.y + BLOCK/2, blockData.z + BLOCK/2); }
                    } else { dummyBox.min.set(blockData.x - BLOCK/2, blockData.y - BLOCK/2, blockData.z - BLOCK/2); dummyBox.max.set(blockData.x + BLOCK/2, blockData.y + BLOCK/2, blockData.z + BLOCK/2); }

                    const pt = raycaster.ray.intersectBox(dummyBox, new THREE.Vector3());
                    if (pt) {
                        const dist = origin.distanceTo(pt);
                        if (dist < minDist) {
                            minDist = dist; const normal = new THREE.Vector3(); const epsilon = 0.1;
                            if (Math.abs(pt.x - dummyBox.min.x) < epsilon) normal.set(-1, 0, 0); else if (Math.abs(pt.x - dummyBox.max.x) < epsilon) normal.set(1, 0, 0); else if (Math.abs(pt.y - dummyBox.min.y) < epsilon) normal.set(0, -1, 0); else if (Math.abs(pt.y - dummyBox.max.y) < epsilon) normal.set(0, 1, 0); else if (Math.abs(pt.z - dummyBox.min.z) < epsilon) normal.set(0, 0, -1); else if (Math.abs(pt.z - dummyBox.max.z) < epsilon) normal.set(0, 0, 1);
                            closestHit = { blockData, point: pt, distance: dist, normal };
                        }
                    }
                }
            }
        }
    }
    return closestHit;
}

function checkCollision(pos, isHorizontal, dim) {
    const d = dim || { w: 10, h: isCrouching ? 24 : 32 }; 
    const minX = Math.floor((pos.x - d.w/2)/BLOCK), maxX = Math.ceil((pos.x + d.w/2)/BLOCK);
    const minY = Math.floor((pos.y - d.h + (isHorizontal?8:0))/BLOCK), maxY = Math.ceil(pos.y/BLOCK);
    const minZ = Math.floor((pos.z - d.w/2)/BLOCK), maxZ = Math.ceil((pos.z + d.w/2)/BLOCK);
    const playerBox = new THREE.Box3( new THREE.Vector3(pos.x - d.w/2, pos.y - d.h + (isHorizontal?8:0), pos.z - d.w/2), new THREE.Vector3(pos.x + d.w/2, pos.y, pos.z + d.w/2) );

    for(let x = minX; x <= maxX; x++) {
        for(let y = minY; y <= maxY; y++) {
            for(let z = minZ; z <= maxZ; z++) {
                const blockData = worldMap.get(getKey(x*BLOCK, y*BLOCK, z*BLOCK));
                if(blockData) {
                    const type = blockData.type; if(['fire','lava','nether_portal'].includes(type)) continue; 
                    let bBox;
                    if (!blockData.isInstanced && (type.includes('door') || type === 'oak_trapdoor')) {
                        const isOpen = blockData.mesh.userData.isOpen; if (isOpen) continue; 
                        if (type === 'oak_trapdoor') bBox = new THREE.Box3( new THREE.Vector3(x*BLOCK - BLOCK/2, y*BLOCK - BLOCK/2, z*BLOCK - BLOCK/2), new THREE.Vector3(x*BLOCK + BLOCK/2, y*BLOCK - BLOCK/2 + (BLOCK*0.2), z*BLOCK + BLOCK/2) );
                        else bBox = new THREE.Box3( new THREE.Vector3(x*BLOCK - BLOCK/2, y*BLOCK - BLOCK/2, z*BLOCK - BLOCK/2), new THREE.Vector3(x*BLOCK + BLOCK/2, y*BLOCK + BLOCK/2, z*BLOCK + BLOCK/2) );
                    } else bBox = new THREE.Box3( new THREE.Vector3(x*BLOCK - BLOCK/2, y*BLOCK - BLOCK/2, z*BLOCK - BLOCK/2), new THREE.Vector3(x*BLOCK + BLOCK/2, y*BLOCK + BLOCK/2, z*BLOCK + BLOCK/2) );
                    if(playerBox.intersectsBox(bBox)) return { collided: true, box: bBox };
                }
            }
        }
    } return { collided: false };
}

class DroppedItem {
    constructor(id, count, pos, vel) {
        this.id = id; this.count = count; this.velocity = vel; this.creationTime = Date.now(); this.pickupDelay = Date.now() + 1500; this.onGround = false;
        const info = ITEMS[id]; const isBlock = info.block; let geo, mat;
        if (isBlock) { geo = new THREE.BoxGeometry(6,6,6); mat = getBlockMaterial(id); } else { geo = new THREE.PlaneGeometry(6,6); mat = new THREE.MeshBasicMaterial({map:loadTex(info.src),transparent:true,side:THREE.DoubleSide}); }
        this.mesh = new THREE.Mesh(geo, mat); this.mesh.position.copy(pos); this.physicsPos = pos.clone(); scene.add(this.mesh); this.isBlock = isBlock; this.isFallingBlock = false; 
    }
    update(delta, playerPos) {
        if (!this.onGround) {
            this.velocity.y -= 9.8 * 50.0 * delta; this.physicsPos.addScaledVector(this.velocity, delta);
            const col = checkCollision(this.physicsPos, false, {w:6, h:6});
            if (col.collided) { 
                this.onGround = true; this.velocity.set(0, 0, 0); this.physicsPos.y = col.box.max.y + 3; 
                if (this.isFallingBlock) { placeBlock(Math.round(this.physicsPos.x/BLOCK)*BLOCK, Math.round(this.physicsPos.y/BLOCK + 0.5)*BLOCK, Math.round(this.physicsPos.z/BLOCK)*BLOCK, this.id); return true; }
            }
        }
        this.mesh.position.copy(this.physicsPos);
        if (!this.isFallingBlock) {
            this.mesh.rotation.y += 3.0 * delta; if(this.onGround && !this.isBlock) this.mesh.position.y += Math.sin(Date.now()*0.003 * 3) * 1.5;
            if (Date.now() > this.pickupDelay && this.physicsPos.distanceTo(playerPos) < 30) { if (addItemToInventory(this.id, this.count)) return true; }
        } return Date.now() - this.creationTime > 300000;
    }
    dispose() { scene.remove(this.mesh); }
}

function updateFurnaces(dt) {
    for(const furnace of activeFurnaces) {
        const data = furnace.userData.furnace;
        if (data.burnTime > 0) { data.burnTime -= dt * 1000; if(data.burnTime < 0) data.burnTime = 0; }
        const resultId = data.input ? SMELT_RECIPES[data.input.id] : null; const canSmelt = resultId && (!data.output || (data.output.id === resultId && data.output.count < 64));
        if (canSmelt) {
            if (data.burnTime <= 0) {
                const fuelVal = data.fuel ? FUEL_VALUES[data.fuel.id] : 0;
                if (fuelVal) { data.burnTime = fuelVal * 1000; data.maxBurnTime = data.burnTime; data.fuel.count--; if (data.fuel.count <= 0) { if (data.fuel.id === 'lava_bucket') data.fuel = { id: 'bucket', count: 1 }; else data.fuel = null; } }
            }
            if (data.burnTime > 0) { data.cookTime += dt; if (data.cookTime >= 10) { data.cookTime = 0; data.input.count--; if (data.input.count <= 0) data.input = null; if (data.output) data.output.count++; else data.output = { id: resultId, count: 1 }; } } else { data.cookTime = 0; }
        } else { data.cookTime = 0; }
    }
}

function throwItem() {
    const item = inventory[selectedSlot];
    if (item && item.count > 0) {
        if (gameMode === 'survival') { item.count--; if (item.count <= 0) inventory[selectedSlot] = null; } renderInventory();
        const dir = new THREE.Vector3(); camera.getWorldDirection(dir); const spawnPos = controls.getObject().position.clone().add(dir.clone().multiplyScalar(5));
        const vel = dir.clone().multiplyScalar(60); vel.y += 30; droppedItems.push(new DroppedItem(item.id, 1, spawnPos, vel));
    }
}

function animate() {
    requestAnimationFrame(animate); if(isPaused || isTitleScreen) return;
    const time = performance.now(); let delta = (time - prevTime) / 1000;
    if (delta > 0.1) delta = 0.1;
    if(limitFPS > 0) { if(time - lastFrameTime < 1000 / limitFPS) return; }
    lastFrameTime = time; prevTime = time;
    if(showFPS) document.getElementById('fps-display').innerText = `FPS: ${Math.round(1 / delta)}`;

    updateFurnaces(delta); if(currentFurnace) renderFurnace();
    
    for (let i = activeChatMessages.length - 1; i >= 0; i--) { const msg = activeChatMessages[i]; if (Date.now() - msg.time > CHAT_TIMEOUT) { msg.el.style.opacity = '0'; if (Date.now() - msg.time > CHAT_TIMEOUT + 500) { if (msg.el.parentNode) msg.el.parentNode.removeChild(msg.el); activeChatMessages.splice(i, 1); } } }

    if (hudMeshes.length > 0) { let meshIndex = 0; for(let i=0; i<9; i++) { if(inventory[i]) { if(i === selectedSlot) hudMeshes[meshIndex].rotation.y += delta * 1.5; else hudMeshes[meshIndex].rotation.y = ITEMS[inventory[i].id].block ? Math.PI / 4 : 0; meshIndex++; } } }

    if (fireMaterial) { const frame = Math.floor(time / 50); const fireSwap = Math.floor(time / 150) % 2 === 0; if (fireTexture2 && fireTexture2.image && fireSwap) fireMaterial.map = fireTexture2; else if (fireTexture1) fireMaterial.map = fireTexture1; if (fireMaterial.map && fireMaterial.map.image) fireMaterial.map.offset.y = (ANIM_FRAMES - 1 - (frame % ANIM_FRAMES)) / ANIM_FRAMES; }

    if (controls.isLocked) {
        const bobX = (moveForward||moveBackward||moveLeft||moveRight) && !isFlying ? Math.cos(time * 0.005) * 0.05 : 0; const bobY = (moveForward||moveBackward||moveLeft||moveRight) && !isFlying ? Math.sin(time * 0.01) * 0.05 : 0;
        let handX = 0.6 + bobX, handY = -0.3 + bobY, handZ = -0.8, handRotX = 0.2, handRotY = -0.2, handRotZ = 0;
        if (handSwingTime > 0) { 
            handSwingTime -= delta * 5; 
            if (handSwingType === 'punch') { const progress = Math.sin(handSwingTime * Math.PI); handZ -= progress * 0.5; handX -= progress * 0.2; handRotX -= progress * 0.2; } else { const progress = Math.sin(handSwingTime * Math.PI); handRotX -= progress * 0.5; handY -= progress * 0.1; }
            if(handSwingTime < 0) handSwingTime = 0; 
        }
        handMesh.position.set(handX, handY, handZ); handMesh.rotation.set(handRotX, handRotY, handRotZ); offHandMesh.position.set(-0.6-bobX, -0.3+bobY, -0.8); offHandMesh.position.y += Math.sin(time * 0.002) * 0.01;

        if (!isFlying) { velocity.y -= 9.8 * 100.0 * delta; if (velocity.y < -800) velocity.y = -800; } else { velocity.y = 0; if (moveUp) velocity.y += 100 * delta; if (moveDown && isFlying) velocity.y -= 100 * delta; }
        const drag = isFlying ? 5.0 : 10.0; velocity.x -= velocity.x * drag * delta; velocity.z -= velocity.z * drag * delta;
        const forward = new THREE.Vector3(); camera.getWorldDirection(forward); forward.y = 0; forward.normalize(); const right = new THREE.Vector3(); right.crossVectors(forward, camera.up).normalize(); const moveVec = new THREE.Vector3();
        if (moveForward) moveVec.add(forward); if (moveBackward) moveVec.sub(forward); if (moveRight) moveVec.add(right); if (moveLeft) moveVec.sub(right); moveVec.normalize();
        
        let speed = isFlying ? 800.0 : 600.0, targetFov = 75;
        if (isSprinting && !isCrouching && !isFlying) { speed = 1000.0; targetFov = 85; }
        if (isCrouching && !isFlying) { speed = 200.0; isSprinting = false; }
        camera.fov += (targetFov - camera.fov) * 0.1; camera.updateProjectionMatrix();

        if (moveVec.lengthSq() > 0) { velocity.x += moveVec.x * speed * delta; velocity.z += moveVec.z * speed * delta; }
        currentEyeHeight += ((isCrouching ? CROUCH_HEIGHT : STAND_HEIGHT) - currentEyeHeight) * 0.2;

        const steps = 15; const subDelta = delta / steps; const playerDim = { w: 10, h: isCrouching ? 24 : 32 };
        for(let s = 0; s < steps; s++) {
            let proposedX = controls.getObject().position.x + (velocity.x * subDelta); let proposedZ = controls.getObject().position.z + (velocity.z * subDelta);
            if (isCrouching && onGround && !isFlying) {
                const testPos = new THREE.Vector3(proposedX, controls.getObject().position.y, controls.getObject().position.z);
                if (!checkCollision(new THREE.Vector3(testPos.x, testPos.y - 5, testPos.z), false, playerDim).collided) { velocity.x = 0; proposedX = controls.getObject().position.x; }
                testPos.set(proposedX, controls.getObject().position.y, proposedZ);
                if (!checkCollision(new THREE.Vector3(testPos.x, testPos.y - 5, testPos.z), false, playerDim).collided) { velocity.z = 0; proposedZ = controls.getObject().position.z; }
            }
            controls.getObject().position.x = proposedX; if (checkCollision(controls.getObject().position, true, playerDim).collided && !isFlying) { controls.getObject().position.x -= (velocity.x * subDelta); velocity.x = 0; }
            controls.getObject().position.z = proposedZ; if (checkCollision(controls.getObject().position, true, playerDim).collided && !isFlying) { controls.getObject().position.z -= (velocity.z * subDelta); velocity.z = 0; }
            if (isFlying) { controls.getObject().position.y += velocity.y; onGround = false; } else {
                controls.getObject().position.y += (velocity.y * subDelta); const colY = checkCollision(controls.getObject().position, false, playerDim);
                if (colY.collided) {
                    if (velocity.y < 0) { 
                        if (!onGround && gameMode === 'survival') { const fallDist = playerMaxY - controls.getObject().position.y; if (fallDist > 60) { const dmg = Math.floor((fallDist - 60) / 20); if(dmg > 0) damagePlayer(dmg); } }
                        velocity.y = 0; canJump = true; onGround = true; controls.getObject().position.y = colY.box.max.y + currentEyeHeight + 0.001; playerMaxY = controls.getObject().position.y;
                    } else { const playerWaistY = controls.getObject().position.y - (currentEyeHeight * 0.5); if (colY.box.min.y > playerWaistY) { velocity.y = 0; controls.getObject().position.y = colY.box.min.y - 0.1; } }
                } else { onGround = false; }
            }
        } 
        if (!isFlying && !onGround && controls.getObject().position.y > playerMaxY) playerMaxY = controls.getObject().position.y;
        if (controls.getObject().position.y < -150) { controls.getObject().position.set(0, 80, 0); velocity.set(0,0,0); isFlying = false; damagePlayer(100); }
    }

    const playerPos = controls.getObject().position;
    for (let i = droppedItems.length - 1; i >= 0; i--) { if (droppedItems[i].update(delta, playerPos)) { droppedItems[i].dispose(); droppedItems.splice(i, 1); } }

    if (playerGroup && viewMode > 0) {
        playerHead.rotation.x = camera.rotation.x; 
        if (moveForward || moveBackward || moveLeft || moveRight) { const walkSpeed = time * (isSprinting ? 0.025 : 0.015); leftLeg.rotation.x = Math.sin(walkSpeed) * 0.5; rightLeg.rotation.x = Math.cos(walkSpeed) * 0.5; leftArm.rotation.x = Math.cos(walkSpeed) * 0.5; rightArm.rotation.x = Math.sin(walkSpeed) * 0.5; } 
        else { leftLeg.rotation.x = 0; rightLeg.rotation.x = 0; leftArm.rotation.x = 0; rightArm.rotation.x = 0; }
    }

    const originalPos = camera.position.clone(); const originalRot = camera.rotation.clone();

    if (viewMode !== 0) {
        const pivotPos = new THREE.Vector3(); camera.getWorldPosition(pivotPos); if(isCrouching) pivotPos.y -= 8;
        const camDir = new THREE.Vector3(); camera.getWorldDirection(camDir); const rayDir = camDir.clone().negate(); if (viewMode === 2) rayDir.negate(); 
        
        const ray = new THREE.Raycaster(pivotPos, rayDir);
        const hit = customRaycast(ray, 60);
        let targetDist = MAX_TPS_DIST; if (hit) { targetDist = Math.max(2, hit.distance - 2); }
        tpsCamDist += (targetDist - tpsCamDist) * 0.2; 
        if (viewMode === 1) camera.position.z += tpsCamDist; else { camera.position.z -= tpsCamDist; camera.rotation.y += Math.PI; camera.rotation.x *= -1; }
    }

    // High performance highlight check instead of huge ThreeJS hierarchy
    const rCheck = new THREE.Raycaster(); rCheck.setFromCamera(new THREE.Vector2(0,0), camera);
    const hlHit = customRaycast(rCheck, 60);
    if(hlHit) { highlightMesh.visible = true; highlightMesh.position.set(hlHit.blockData.x, hlHit.blockData.y, hlHit.blockData.z); } else { highlightMesh.visible = false; }
    
    renderer.clear(); renderer.render(scene, camera);
    renderer.clearDepth(); renderer.render(hudScene, hudCamera);

    if (viewMode !== 0) { camera.position.copy(originalPos); camera.rotation.copy(originalRot); }
}

function onKeyDown(e) {
    if(isSettingChatKey) { chatKey = e.code; isSettingChatKey = false; const btn = document.getElementById('btn-chat-key'); btn.innerText = `Chat Key: ${chatKey.replace('Key','')}`; btn.classList.remove('listening'); return; }
    if(isChatOpen) { if(e.code === 'Enter') { const val = document.getElementById('chat-input').value.trim(); if(val) addChatMessage(`<${username}> ${val}`); toggleChat(); } else if(e.code === 'Escape') toggleChat(); return; }
    if(isDead || isPaused || isTitleScreen) return;
    if(e.code === chatKey) { toggleChat(); e.preventDefault(); return; }

    switch(e.code) {
        case 'KeyW': const now = Date.now(); if (now - lastWTime < 300) isSprinting = true; lastWTime = now; moveForward = true; break; 
        case 'KeyS': moveBackward = true; break; case 'KeyA': moveLeft = true; break; case 'KeyD': moveRight = true; break; 
        case 'ShiftLeft': if(isFlying) { moveDown = true; } else { isCrouching = true; } break; 
        case 'Space': 
            if (gameMode === 'creative') { const now = Date.now(); if (now - lastSpaceTime < 300) { isFlying = !isFlying; velocity.y = 0; playerMaxY = controls.getObject().position.y; } else { if(isFlying) moveUp = true; else if(canJump) { velocity.y += 250; canJump = false; onGround = false; } } lastSpaceTime = now; } 
            else { if(canJump) { velocity.y += 250; canJump = false; onGround = false; } else moveUp = true; } break;
        case 'Digit1': selectedSlot=0; renderInventory(); break; case 'Digit2': selectedSlot=1; renderInventory(); break; case 'Digit3': selectedSlot=2; renderInventory(); break;
        case 'Digit4': selectedSlot=3; renderInventory(); break; case 'Digit5': selectedSlot=4; renderInventory(); break; case 'Digit6': selectedSlot=5; renderInventory(); break;
        case 'Digit7': selectedSlot=6; renderInventory(); break; case 'Digit8': selectedSlot=7; renderInventory(); break; case 'Digit9': selectedSlot=8; renderInventory(); break;
        case 'KeyQ': if(controls.isLocked) throwItem(); break; 
        case 'KeyE':
            if(controls.isLocked) {
                controls.unlock(); isInventoryOpen = true;
                if (gameMode === 'survival') { craftingMode = 2; for(let i=36; i<45; i++) inventory[i] = null; document.getElementById('inventory-screen').style.display = 'flex'; document.getElementById('creative-screen').style.display = 'none'; } 
                else { document.getElementById('inventory-screen').style.display = 'none'; document.getElementById('creative-screen').style.display = 'flex'; } renderInventory();
            } else if (isInventoryOpen) { isInventoryOpen = false; document.getElementById('inventory-screen').style.display = 'none'; document.getElementById('creative-screen').style.display = 'none'; document.getElementById('chest-screen').style.display = 'none'; document.getElementById('furnace-screen').style.display = 'none'; currentChest = null; currentFurnace = null; if(!document.pointerLockElement) controls.lock(); } break;
        case 'KeyF': const temp = inventory[selectedSlot]; inventory[selectedSlot] = offHandItem; offHandItem = temp; renderInventory(); break;
        case 'F4':
            viewMode = (viewMode + 1) % 3;
            if(viewMode === 0) { playerGroup.visible = false; handMesh.visible = true; offHandMesh.visible = true; document.getElementById('crosshair').style.display = 'block'; } 
            else { playerGroup.visible = true; handMesh.visible = false; offHandMesh.visible = false; document.getElementById('crosshair').style.display = 'none'; } break;
    }
}

function onKeyUp(e) { if(['KeyW','KeyS','KeyA','KeyD'].includes(e.code)) { if(e.code==='KeyW') { moveForward=false; isSprinting = false; } if(e.code==='KeyS') moveBackward=false; if(e.code==='KeyA') moveLeft=false; if(e.code==='KeyD') moveRight=false; } if(e.code === 'ShiftLeft') { moveDown = false; isCrouching = false; } if(e.code === 'Space') moveUp = false; }
function onScroll(e) { if(controls.isLocked) { selectedSlot = (selectedSlot + (e.deltaY>0?1:-1) + 9) % 9; renderInventory(); } }

function onMouseClick(e) {
    if(isTitleScreen || isPaused || isChatOpen) return;
    if(!controls.isLocked) { if(e.target === renderer.domElement && !document.pointerLockElement) controls.lock(); return; }
    
    handSwingType = e.button === 0 ? 'punch' : 'place'; handSwingTime = 1;

    const ray = new THREE.Raycaster(); ray.setFromCamera(new THREE.Vector2(0,0), camera);
    const hit = customRaycast(ray, 60);
    
    if(hit) {
        const blockData = hit.blockData;
        if(e.button === 0) { 
            if (gameMode === 'survival' && !blockData.isInstanced) { if(blockData.type === 'fire') { if(blockData.mesh.userData.health > 1) { blockData.mesh.userData.health--; return; } } else if (blockData.type === 'lava' || blockData.type === 'nether_portal') return; }
            removeBlockFromData(blockData);
        } 
        if(e.button === 2) { 
            const item = inventory[selectedSlot];
            if (!blockData.isInstanced) {
                const obj = blockData.mesh;
                if (blockData.type.includes('door') || blockData.type === 'oak_trapdoor') {
                    const newState = !obj.userData.isOpen;
                    const updateDoorVisuals = (targetObj) => {
                        targetObj.userData.isOpen = newState;
                        if (targetObj.userData.type === 'oak_trapdoor') { targetObj.rotation.x = newState ? -Math.PI/2 : 0; targetObj.position.y += newState ? BLOCK*0.4 : -BLOCK*0.4; } 
                        else { targetObj.rotation.y = newState ? Math.PI/2 : 0; targetObj.position.x = newState ? targetObj.userData.baseX + BLOCK*0.4 : targetObj.userData.baseX; targetObj.position.z = newState ? targetObj.userData.baseZ + BLOCK*0.4 : targetObj.userData.baseZ; }
                    };
                    updateDoorVisuals(obj);
                    if (blockData.type === 'oak_door_b') { const top = worldMap.get(getKey(blockData.x, blockData.y + BLOCK, blockData.z)); if(top && top.type === 'oak_door_top') updateDoorVisuals(top.mesh); } 
                    else if (blockData.type === 'oak_door_top') { const bot = worldMap.get(getKey(blockData.x, blockData.y - BLOCK, blockData.z)); if(bot && bot.type === 'oak_door_b') updateDoorVisuals(bot.mesh); }
                    return;
                }
                if ((blockData.type === 'chest' || blockData.type === 'large_chest') && !isCrouching) { controls.unlock(); isInventoryOpen = true; currentChest = obj; document.getElementById('chest-screen').style.display = 'flex'; renderInventory(); return; }
                if(blockData.type === 'furnace' && !isCrouching) { controls.unlock(); isInventoryOpen = true; currentFurnace = obj; document.getElementById('furnace-screen').style.display = 'flex'; renderInventory(); return; }
                if(blockData.type === 'crafting_table' && !isCrouching) { controls.unlock(); isInventoryOpen = true; craftingMode = 3; for(let i=36; i<45; i++) inventory[i] = null; document.getElementById('inventory-screen').style.display = 'flex'; document.getElementById('creative-screen').style.display = 'none'; renderInventory(); return; }
            }

            if(!item) return;

            const pos = new THREE.Vector3(blockData.x, blockData.y, blockData.z).add(hit.normal.multiplyScalar(BLOCK));
            
            if (item.id === 'oak_door') { placeBlock(pos.x, pos.y, pos.z, 'oak_door_b'); placeBlock(pos.x, pos.y + BLOCK, pos.z, 'oak_door_top'); } 
            else if(ITEMS[item.id].block) {
                const pPos = controls.getObject().position; const dx = Math.abs(pos.x - pPos.x); const dz = Math.abs(pos.z - pPos.z); const feetY = pPos.y - currentEyeHeight; 
                if (dx < 15 && dz < 15 && (feetY < pos.y+10 && pPos.y > pos.y-10) && item.id !== 'fire' && item.id !== 'lava') return; 
                let rotation = 0; if (item.id === 'furnace' || item.id === 'chest') { const angle = Math.atan2(pPos.x - pos.x, pPos.z - pos.z); rotation = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2); }
                placeBlock(pos.x, pos.y, pos.z, item.id, 0, rotation); checkGravityTrigger(pos.x, pos.y, pos.z);
            } else if(item.id === 'flint_and_steel') { placeBlock(pos.x, pos.y, pos.z, 'fire'); }

            if (gameMode === 'survival') { item.count--; if(item.count <= 0) inventory[selectedSlot] = null; } renderInventory();
        }
    }
}
