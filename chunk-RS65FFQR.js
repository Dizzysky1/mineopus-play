import{a as Ze,c as rh,d as oh}from"./chunk-IYYICWTN.js";import{c as Ga,r as sh}from"./chunk-I5BBNOKN.js";import{a as re,b as Ha,d as nh}from"./chunk-CMOHHRMX.js";import{e as gt,f as Qi,g as Re,h as oi,i as Mn,j as We,k as Se,m as Va,n as eh,o as ih}from"./chunk-TSBZTAXJ.js";var Jf=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];var wi=[[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]];var $f=[5,4,1,0];var Je={EMPTY:0,GENERATED:1,LIT:2},xr=class{constructor(t,e,i=null){this.cx=t,this.cz=e;let n=(r,o)=>r instanceof o&&r.length===65536;this.blocks=i&&n(i.blocks,Uint16Array)?i.blocks:new Uint16Array(65536),this.meta=i&&n(i.meta,Uint8Array)?i.meta:new Uint8Array(65536),this.light=i&&n(i.light,Uint8Array)?i.light:new Uint8Array(65536),this.water=null,this.biomes=new Uint8Array(256),this.heightMap=new Uint16Array(256),this.sectionNonAir=new Uint16Array(16),this.state=Je.EMPTY,this.dirty=new Uint8Array(16),this.meshedOnce=!1,this.meshSeq=null,this.meshPending=0,this.renderEpoch=0,this.modified=!1,this.blockEntities=new Map,this.savedEntities=null,this.inhabitedTicks=0,this.lastSaved=0}static index(t,e,i){return e<<8|i<<4|t}getBlock(t,e,i){return this.blocks[e<<8|i<<4|t]}getMeta(t,e,i){return this.meta[e<<8|i<<4|t]}isWaterloggedAt(t){let e=this.water;return e!==null&&(e[t>>3]>>(t&7)&1)===1}setWaterloggedAt(t,e){e?(this.water||(this.water=new Uint8Array(8192)),this.water[t>>3]|=1<<(t&7)):this.water&&(this.water[t>>3]&=~(1<<(t&7)))}setRaw(t,e,i,n,r=0){let o=e<<8|i<<4|t,a=this.blocks[o];a===0&&n!==0?this.sectionNonAir[e>>4]++:a!==0&&n===0&&this.sectionNonAir[e>>4]--,this.blocks[o]=n,this.meta[o]=r}recountSections(){this.sectionNonAir.fill(0);let t=this.blocks;for(let e=0;e<65536;e++)t[e]!==0&&this.sectionNonAir[e>>12]++}computeHeightMap(){for(let t=0;t<16;t++)for(let e=0;e<16;e++)this.updateHeightAt(e,t)}updateHeightAt(t,e){let i=255,n=this.blocks,r=this.water;for(;i>=0;){let o=i<<8|e<<4|t;if(We[n[o]]!==0||r!==null&&r[o>>3]>>(o&7)&1)break;i--}this.heightMap[e<<4|t]=i+1}markAllDirty(){this.dirty.fill(1)}serialize(){let t={};for(let[e,i]of this.blockEntities)t[e]=i;return{cx:this.cx,cz:this.cz,blocks:this.blocks,meta:this.meta,biomes:this.biomes,water:this.water,blockEntities:t,entities:this.savedEntities||[]}}};var Ss=[1,-1,0,0,0,0],bs=[0,0,1,-1,0,0],ws=[0,0,0,0,1,-1],Ts=class{constructor(t){this.stride=t,this.data=new Int32Array(4096*t),this.head=0,this.tail=0}push(t,e,i,n=0){if(this.tail+this.stride>this.data.length)if(this.head>this.data.length/2)this.data.copyWithin(0,this.head,this.tail),this.tail-=this.head,this.head=0;else{let a=new Int32Array(this.data.length*2);a.set(this.data),this.data=a}let r=this.data,o=this.tail;r[o]=t,r[o+1]=e,r[o+2]=i,this.stride>3&&(r[o+3]=n),this.tail+=this.stride}get empty(){return this.head>=this.tail}reset(){this.head=0,this.tail=0}};var vr=class{constructor(t){this.world=t,this.addQ=new Ts(3),this.addQ2=new Ts(3),this.remQ=new Ts(4),this._ck=2147483647,this._cz=0,this._cc=null,this.stats={chunks:0,ms:0,updates:0}}chunk(t,e){if(t===this._ck&&e===this._cz)return this._cc;let i=this.world.getChunk(t,e);return this._ck=t,this._cz=e,this._cc=i,i}resetCache(){this._ck=2147483647,this._cc=null}lightChunk(t){let e=performance.now();this.resetCache();let i=this.world,n=t.light,r=t.blocks,o=t.water||null,a=t.cx<<4,l=t.cz<<4;for(let _=0;_<16;_++)for(let m=0;m<16;m++){let p=15;for(let S=255;S>=0;S--){let E=S<<8|_<<4|m,y=We[r[E]];if(y===0&&o!==null&&o[E>>3]>>(E&7)&1&&(y=1),y&&(p=y>=15?0:Math.max(0,p-y)),p===0)break;let b=n[E]>>4;p>b&&(n[E]=p<<4|n[E]&15)}}let c=this.addQ;c.reset();let h=t.heightMap,f=i.getChunk(t.cx,t.cz-1),u=i.getChunk(t.cx,t.cz+1),d=i.getChunk(t.cx-1,t.cz),g=i.getChunk(t.cx+1,t.cz);for(let _=0;_<16;_++)for(let m=0;m<16;m++){let p=h[_<<4|m],S=p,E;E=m<15?h[_<<4|m+1]:g?g.heightMap[_<<4]:p,E>S&&(S=E),E=m>0?h[_<<4|m-1]:d?d.heightMap[_<<4|15]:p,E>S&&(S=E),E=_<15?h[_+1<<4|m]:u?u.heightMap[m]:p,E>S&&(S=E),E=_>0?h[_-1<<4|m]:f?f.heightMap[240|m]:p,E>S&&(S=E);let y=Math.min(255,S);for(let b=0;b<=y;b++){let w=b<<8|_<<4|m;n[w]>>4>1&&c.push(a+m,b,l+_)}}this.propagateSky(c),c.reset();for(let _=0;_<r.length;_++){let m=Mn[r[_]];m&&((n[_]&15)<m&&(n[_]=n[_]&240|m),c.push(a+(_&15),_>>8,l+(_>>4&15)))}this.propagateBlock(c),this.stats.chunks++,this.stats.ms+=performance.now()-e}pullFromNeighbours(t){this.resetCache();let e=this.world,i=t.cx<<4,n=t.cz<<4,r=this.addQ;r.reset();let o=this.addQ2;o.reset();let a=[[-1,0],[16,0],[0,-1],[0,16]];for(let[l,c]of a){let h=e.getChunk(i+l>>4,n+c>>4);if(!(!h||h.state<2))for(let f=0;f<16;f++){let u=l===-1?15:l===16?0:f,d=c===-1?15:c===16?0:f,g=l===-1?i-1:l===16?i+16:i+f,_=c===-1?n-1:c===16?n+16:n+f;for(let m=0;m<256;m++){let p=h.light[m<<8|d<<4|u];p>>4>1&&r.push(g,m,_),(p&15)>1&&o.push(g,m,_)}}}this.propagateSky(r),this.propagateBlock(o)}propagateSky(t){let e=this.world;for(;t.head<t.tail;){let i=t.data,n=i[t.head],r=i[t.head+1],o=i[t.head+2];t.head+=3;let a=n>>4,l=o>>4,c=this.chunk(a,l);if(!c)continue;let h=c.light[r<<8|(o&15)<<4|n&15]>>4;if(!(h<=1))for(let f=0;f<6;f++){let u=n+Ss[f],d=r+bs[f],g=o+ws[f];if(d<0||d>=256)continue;let _=u>>4===a&&g>>4===l?c:this.chunk(u>>4,g>>4);if(!_)continue;let m=d<<8|(g&15)<<4|u&15,p=We[_.blocks[m]];if(p===0&&_.water&&_.water[m>>3]>>(m&7)&1&&(p=1),p>=15)continue;let S=f===3&&h===15&&p===0?15:h-(p>1?p:1),E=_.light[m];S>E>>4&&(_.light[m]=S<<4|E&15,_.meshedOnce&&e.onLightChanged(_,u,d,g),t.push(u,d,g))}}t.reset()}propagateBlock(t){let e=this.world;for(;t.head<t.tail;){let i=t.data,n=i[t.head],r=i[t.head+1],o=i[t.head+2];t.head+=3;let a=n>>4,l=o>>4,c=this.chunk(a,l);if(!c)continue;let h=c.light[r<<8|(o&15)<<4|n&15]&15;if(!(h<=1))for(let f=0;f<6;f++){let u=n+Ss[f],d=r+bs[f],g=o+ws[f];if(d<0||d>=256)continue;let _=u>>4===a&&g>>4===l?c:this.chunk(u>>4,g>>4);if(!_)continue;let m=d<<8|(g&15)<<4|u&15,p=We[_.blocks[m]];if(p===0&&_.water&&_.water[m>>3]>>(m&7)&1&&(p=1),p>=15)continue;let S=h-(p>1?p:1),E=_.light[m];S>(E&15)&&(_.light[m]=E&240|S,_.meshedOnce&&e.onLightChanged(_,u,d,g),t.push(u,d,g))}}t.reset()}stitch(t,e){this.resetCache();let i=performance.now(),n=e.cx-t.cx,r=e.cz-t.cz,o=this.addQ,a=this.addQ2;o.reset(),a.reset();let l=t.light,c=e.light,h=t.blocks,f=e.blocks,u=t.water||null,d=e.water||null,g=t.cx<<4,_=t.cz<<4,m=e.cx<<4,p=e.cz<<4;for(let S=0;S<16;S++){let E=n===1?15:n===-1?0:S,y=r===1?15:r===-1?0:S,b=n===1?0:n===-1?15:S,w=r===1?0:r===-1?15:S;for(let R=0;R<256;R++){let v=R<<8|y<<4|E,T=R<<8|w<<4|b,I=l[v],L=c[T];if(I===L)continue;let F=We[h[v]],B=We[f[T]];F===0&&u!==null&&u[v>>3]>>(v&7)&1&&(F=1),B===0&&d!==null&&d[T>>3]>>(T&7)&1&&(B=1);let P=I>>4,z=L>>4,Y=I&15,q=L&15;if(B<15){let it=B>1?B:1;P-it>z&&o.push(g+E,R,_+y),Y-it>q&&a.push(g+E,R,_+y)}if(F<15){let it=F>1?F:1;z-it>P&&o.push(m+b,R,p+w),q-it>Y&&a.push(m+b,R,p+w)}}}this.propagateSky(o),this.propagateBlock(a),this.stats.stitchMs=(this.stats.stitchMs||0)+performance.now()-i,this.stats.stitches=(this.stats.stitches||0)+1}onBlockChanged(t,e,i,n,r,o=We[n],a=We[r]){this.resetCache();let l=this.world,c=l.getChunk(t>>4,i>>4);if(!c||c.state<1)return;this.stats.updates++;let h=e<<8|(i&15)<<4|t&15,f=Mn[n],u=Mn[r],d=(i&15)<<4|t&15;if(a>0&&e+1>c.heightMap[d]?c.heightMap[d]=e+1:a===0&&e+1===c.heightMap[d]&&c.updateHeightAt(t&15,i&15),f!==u||o!==a){let g=c.light[h]&15,_=this.addQ;_.reset(),g>0&&(a>o||u<g)&&this.removeBlockLight(t,e,i,g,_),u>0&&((c.light[h]&15)<u&&(c.light[h]=c.light[h]&240|u),l.onLightChanged(c,t,e,i),_.push(t,e,i)),this.pushNeighbours(t,e,i,_,!1),this.propagateBlock(_)}if(o!==a){let g=this.addQ;g.reset();let _=c.light[h]>>4;a>o&&_>0&&this.removeSkyLight(t,e,i,_,g),this.pushNeighbours(t,e,i,g,!0),this.propagateSky(g)}}pushNeighbours(t,e,i,n,r){for(let o=0;o<6;o++){let a=t+Ss[o],l=e+bs[o],c=i+ws[o];if(l<0||l>=256)continue;let h=this.chunk(a>>4,c>>4);if(!h)continue;let f=h.light[l<<8|(c&15)<<4|a&15];(r?f>>4:f&15)>0&&n.push(a,l,c)}}removeBlockLight(t,e,i,n,r){let o=this.world,a=this.remQ;a.reset();let l=this.chunk(t>>4,i>>4),c=e<<8|(i&15)<<4|t&15;for(l.light[c]&=240,o.onLightChanged(l,t,e,i),a.push(t,e,i,n);a.head<a.tail;){let h=a.data,f=h[a.head],u=h[a.head+1],d=h[a.head+2],g=h[a.head+3];a.head+=4;for(let _=0;_<6;_++){let m=f+Ss[_],p=u+bs[_],S=d+ws[_];if(p<0||p>=256)continue;let E=this.chunk(m>>4,S>>4);if(!E)continue;let y=p<<8|(S&15)<<4|m&15,b=E.light[y]&15;if(b===0)continue;let w=Mn[E.blocks[y]];b<g&&w<b?(E.light[y]&=240,o.onLightChanged(E,m,p,S),a.push(m,p,S,b),w>0&&(E.light[y]=E.light[y]&240|w,r.push(m,p,S))):r.push(m,p,S)}}a.reset()}removeSkyLight(t,e,i,n,r){let o=this.world,a=this.remQ;a.reset();let l=this.chunk(t>>4,i>>4),c=e<<8|(i&15)<<4|t&15;for(l.light[c]&=15,o.onLightChanged(l,t,e,i),a.push(t,e,i,n);a.head<a.tail;){let h=a.data,f=h[a.head],u=h[a.head+1],d=h[a.head+2],g=h[a.head+3];a.head+=4;for(let _=0;_<6;_++){let m=f+Ss[_],p=u+bs[_],S=d+ws[_];if(p<0||p>=256)continue;let E=this.chunk(m>>4,S>>4);if(!E)continue;let y=p<<8|(S&15)<<4|m&15,b=E.light[y]>>4;b!==0&&(b<g||_===3&&g===15&&b===15?(E.light[y]&=15,o.onLightChanged(E,m,p,S),a.push(m,p,S,b)):r.push(m,p,S))}}a.reset()}};var Kf=65536,bn=new Int32Array(65536);function Wa(s,t,e){let i=We[s[e]];return i===0&&t&&t[e>>3]>>(e&7)&1?1:i}function ah(s,t,e,i=new Uint16Array(256)){e.fill(0);for(let a=0;a<16;a++)for(let l=0;l<16;l++){let c=15,h=0;for(let f=255;f>=0;f--){let u=f<<8|a<<4|l,d=Wa(s,t,u);if(d&&!h&&(h=f+1),d&&(c=d>=15?0:Math.max(0,c-d)),c===0)break;e[u]=c<<4}i[a<<4|l]=h}let n=0,r=0,o=a=>{if(r>=bn.length){let l=new Int32Array(bn.length*2);l.set(bn),bn=l}bn[r++]=a};for(let a=0;a<16;a++)for(let l=0;l<16;l++){let h=i[a<<4|l];l<15&&i[a<<4|l+1]>h&&(h=i[a<<4|l+1]),l>0&&i[a<<4|l-1]>h&&(h=i[a<<4|l-1]),a<15&&i[a+1<<4|l]>h&&(h=i[a+1<<4|l]),a>0&&i[a-1<<4|l]>h&&(h=i[a-1<<4|l]),h>255&&(h=255);for(let f=0;f<=h;f++){let u=f<<8|a<<4|l;e[u]>>4>1&&o(u)}}for(;n<r;){let a=bn[n++],l=e[a]>>4;if(l<=1)continue;let c=a&15,h=a>>4&15,f=a>>8;for(let u=0;u<6;u++){let d;if(u===0){if(c===15)continue;d=a+1}else if(u===1){if(c===0)continue;d=a-1}else if(u===2){if(f===255)continue;d=a+256}else if(u===3){if(f===0)continue;d=a-256}else if(u===4){if(h===15)continue;d=a+16}else{if(h===0)continue;d=a-16}let g=Wa(s,t,d);if(g>=15)continue;let _=u===3&&l===15&&g===0?15:l-(g>1?g:1);_>e[d]>>4&&(e[d]=_<<4|e[d]&15,o(d))}}n=0,r=0;for(let a=0;a<Kf;a++){let l=Mn[s[a]];l&&((e[a]&15)<l&&(e[a]=e[a]&240|l),o(a))}for(;n<r;){let a=bn[n++],l=e[a]&15;if(l<=1)continue;let c=a&15,h=a>>4&15,f=a>>8;for(let u=0;u<6;u++){let d;if(u===0){if(c===15)continue;d=a+1}else if(u===1){if(c===0)continue;d=a-1}else if(u===2){if(f===255)continue;d=a+256}else if(u===3){if(f===0)continue;d=a-256}else if(u===4){if(h===15)continue;d=a+16}else{if(h===0)continue;d=a-16}let g=Wa(s,t,d);if(g>=15)continue;let _=l-(g>1?g:1);_>(e[d]&15)&&(e[d]=e[d]&240|_,o(d))}}return e}var A=1/16,zn=[0,0,0,1,1,1],qa=Object.create(null);function xe(s,t){let[e,i,n,r,o,a]=s;switch(t){case 0:return s;case 1:return[1-r,i,1-a,1-e,o,1-n];case 2:return[n,i,1-r,a,o,1-e];case 3:return[1-a,i,e,1-n,o,r]}return s}function yr(s,t){if(!s)return!1;let e=gt[s];return oi[s]?!0:e.shape==="fence"?(e.fenceType||"wood")===(t.fenceType||"wood"):e.shape==="fence_gate"}function Mr(s){if(!s)return!1;let t=gt[s];return oi[s]||t.shape==="pane"||t.shape==="wall"}function Sr(s){if(!s)return!1;let t=gt[s];return oi[s]||t.shape==="wall"||t.shape==="fence_gate"||t.shape==="pane"}function ch(s,t,e){switch(s.shape){case"cube":return[zn];case"slab":return t===2?[zn]:t===1?[[0,.5,0,1,1,1]]:[[0,0,0,1,.5,1]];case"stairs":return jf(t);case"carpet":return[[0,0,0,1,A,1]];case"snow_layer":return[[0,0,0,1,((t&7)+1)*2*A,1]];case"cactus":return[[A,0,A,1-A,1,1-A]];case"farmland":return[[0,0,0,1,15*A,1]];case"chest":return[xe([A,0,A,1-A,14*A,1-A],t&3)];case"enchanting_table":return[[0,0,0,1,12*A,1]];case"cake":return[[(1+(t&7)*2)*A,0,A,1-A,8*A,1-A]];case"bed":return[[0,3*A,0,1,9*A,1],...td(t)];case"pressure_plate":return[[A,0,A,1-A,t&1?A/2:A,1-A]];case"button":return nd(t);case"lever":return sd(t);case"door":return[ed(t)];case"trapdoor":return[id(t)];case"fence":return fh(s,e,!1);case"fence_gate":return rd(t);case"wall":return dh(e,!1);case"pane":return od(e);case"anvil":return[xe([2*A,0,2*A,14*A,4*A,14*A],t&3),xe([4*A,4*A,3*A,12*A,5*A,13*A],t&3),xe([6*A,5*A,4*A,10*A,10*A,12*A],t&3),xe([3*A,10*A,0,13*A,16*A,1],t&3)];case"portal":return t&1?[[6*A,0,0,10*A,1,1]]:[[0,0,6*A,1,1,10*A]];case"piston":return[Xa(t&8?[0,0,0,1,12*A,1]:zn,br[t&7])];case"piston_head":return[Xa([0,12*A,0,1,1,1],br[t&7]),Xa([6*A,-4*A,6*A,10*A,12*A,10*A],br[t&7])];case"comparator":{let i=t&3,n=t&4?7:5;return[[0,0,0,1,2*A,1],xe([4*A,2*A,2*A,6*A,7*A,4*A],i),xe([10*A,2*A,2*A,12*A,7*A,4*A],i),xe([7*A,2*A,11*A,9*A,n*A,13*A],i)]}case"repeater":{let i=t&3,n=t>>2&3;return[[0,0,0,1,2*A,1],xe([7*A,2*A,2*A,9*A,7*A,4*A],i),xe([7*A,2*A,(6+2*n)*A,9*A,7*A,(8+2*n)*A],i)]}default:return qa[s.shape]?.render?.(s,t,e)??null}}function ji(s,t,e){if(!s.solid)return[];switch(s.shape){case"cube":return[zn];case"fence":return fh(s,e,!0);case"wall":return dh(e,!0);case"fence_gate":return t&4?[]:[xe([0,0,6*A,1,1.5,10*A],(t&3)<2?0:2)];case"snow_layer":{let i=t&7;return i===0?[]:[[0,0,0,1,i*2*A,1]]}case"ladder":return[uh(t)];case"flat":return[[A,0,A,1-A,1.5*A,1-A]];case"bed":return[[0,0,0,1,9*A,1]];case"soul_sand":return[[0,0,0,1,14*A,1]];case"repeater":case"comparator":return[[0,0,0,1,2*A,1]];default:{let i=qa[s.shape];return i?.collision?i.collision(s,t,e):ch(s,t,e)||[zn]}}}function hh(s,t,e){if(!s.selectable)return[];switch(s.shape){case"cross":case"double_plant":return[[2*A,0,2*A,14*A,s.name==="grass"||s.name==="fern"?13*A:1,14*A]];case"crop":return[[0,0,0,1,Math.max(2,(t+1)*2)*A,1]];case"stem":return[[6*A,0,6*A,10*A,Math.max(2,(t+1)*2)*A,10*A]];case"torch":return[Qf(t)];case"ladder":return[uh(t)];case"vine":return[[0,0,0,1,1,1]];case"rail":return[[0,0,0,1,2*A,1]];case"redstone_wire":return[[0,0,0,1,A,1]];case"repeater":case"comparator":return[[0,0,0,1,2*A,1]];case"flat":return[[A,0,A,1-A,1.5*A,1-A]];case"fire":return[];default:{let i=qa[s.shape];return i?.selection?i.selection(s,t,e):ch(s,t,e)||[zn]}}}function Qf(s){if(!s)return[7*A,0,7*A,9*A,10*A,9*A];let t=s-1,e=[5.5*A,3*A,0,10.5*A,13*A,5*A];return xe(e,t)}function uh(s){return xe([0,0,0,1,1,3*A],s&3)}function jf(s){let t=s&3,e=(s&4)!==0;return[e?[0,.5,0,1,1,1]:[0,0,0,1,.5,1],xe(e?[0,0,0,1,.5,.5]:[0,.5,0,1,1,.5],t)]}function td(s){return[[0,0,0,3*A,3*A,3*A],[13*A,0,0,1,3*A,3*A]].map(t=>xe(t,s&4?s&3:[1,0,3,2][s&3]))}function ed(s){let t=s&3,e=(s&4)!==0,i=(s&16)!==0,n=t;return e&&(n=i?[3,2,0,1][t]:[2,3,1,0][t]),xe([0,0,13*A,1,1,1],n)}function id(s){let t=s&3,e=(s&4)!==0,i=(s&8)!==0;return e?xe([0,0,13*A,1,1,1],t):i?[0,13*A,0,1,1,1]:[0,0,0,1,3*A,1]}function nd(s){let t=s&7,i=(s&8)!==0?A:2*A;return t===0?[[5*A,0,6*A,11*A,i,10*A]]:t===5?[[5*A,1-i,6*A,11*A,1,10*A]]:[xe([5*A,6*A,0,11*A,10*A,i],t-1)]}function sd(s){let t=s&7;return t===0?[[5*A,0,4*A,11*A,3*A,12*A]]:t===5?[[5*A,13*A,4*A,11*A,1,12*A]]:[xe([5*A,4*A,0,11*A,12*A,3*A],t-1)]}function fh(s,t,e){let i=e?1.5:1,n=[[6*A,0,6*A,10*A,i,10*A]],r=yr(t(0,0,-1),s),o=yr(t(0,0,1),s),a=yr(t(-1,0,0),s),l=yr(t(1,0,0),s);if(e)return r&&n.push([6*A,0,0,10*A,i,6*A]),o&&n.push([6*A,0,10*A,10*A,i,1]),a&&n.push([0,0,6*A,6*A,i,10*A]),l&&n.push([10*A,0,6*A,1,i,10*A]),n;for(let[c,h]of[[6*A,9*A],[12*A,15*A]])r&&n.push([7*A,c,0,9*A,h,6*A]),o&&n.push([7*A,c,10*A,9*A,h,1]),a&&n.push([0,c,7*A,6*A,h,9*A]),l&&n.push([10*A,c,7*A,1,h,9*A]);return n}function rd(s){let t=s&3,e=(s&4)!==0,i=t<2?0:2,n=[[0,5*A,7*A,2*A,1,9*A],[14*A,5*A,7*A,1,1,9*A]];if(!e)n.push([6*A,6*A,7*A,10*A,15*A,9*A]),n.push([2*A,6*A,7*A,14*A,9*A,9*A]),n.push([2*A,12*A,7*A,14*A,15*A,9*A]);else{let r=t===0||t===2?1:-1,o=r>0?9*A:1*A,a=r>0?15*A:7*A;n.push([0,6*A,o,2*A,15*A,a]),n.push([14*A,6*A,o,1,15*A,a])}return n.map(r=>xe(r,i))}function dh(s,t){let e=t?1.5:1,i=Sr(s(0,0,-1)),n=Sr(s(0,0,1)),r=Sr(s(-1,0,0)),o=Sr(s(1,0,0)),a=s(0,1,0)!==0,l=(i&&n&&!r&&!o||r&&o&&!i&&!n)&&!a,c=[];l||c.push([4*A,0,4*A,12*A,e,12*A]);let h=t?1.5:14*A;return i&&c.push([5*A,0,0,11*A,h,8*A]),n&&c.push([5*A,0,8*A,11*A,h,1]),r&&c.push([0,0,5*A,8*A,h,11*A]),o&&c.push([8*A,0,5*A,1,h,11*A]),c}function od(s){let t=Mr(s(0,0,-1)),e=Mr(s(0,0,1)),i=Mr(s(-1,0,0)),n=Mr(s(1,0,0)),r=[[7*A,0,7*A,9*A,1,9*A]];return!t&&!e&&!i&&!n?[[7*A,0,0,9*A,1,1],[0,0,7*A,1,1,9*A]]:(t&&r.push([7*A,0,0,9*A,1,7*A]),e&&r.push([7*A,0,9*A,9*A,1,1]),i&&r.push([0,0,7*A,7*A,1,9*A]),n&&r.push([9*A,0,7*A,1,1,9*A]),r)}function Nx(s,t,e){if(s.faceTex)return s.faceTex(t,e);let i=s.faceTextures;if(s.pillar){let n=t&3;return n===1?e===0||e===1?{tex:i[2],rot:0}:{tex:i[0],rot:1}:n===2?e===4||e===5?{tex:i[2],rot:0}:{tex:i[0],rot:e===2||e===3?0:1}:{tex:i[e],rot:0}}if(s.facing&&s.textures&&s.textures.front){let n=t&3,r=[5,4,1,0][n];return e===r?{tex:s.textures.front,rot:0}:{tex:i[e],rot:0}}if(s.name==="farmland"&&e===2&&t>0)return{tex:"farmland_moist",rot:0};if(s.shape==="piston"||s.shape==="piston_head"){let n=br[t&7],r=s.textures;return e===n?s.shape==="piston_head"?{tex:t&8&&r.top_sticky?r.top_sticky:r.top,rot:0}:{tex:t&8?r.inner:r.top,rot:0}:e===(n^1)?{tex:r.bottom,rot:0}:{tex:r.side,rot:ld[n][e]}}return s.shape==="repeater"&&e===2?{tex:t&16&&s.textures.top_on?s.textures.top_on:s.textures.top,rot:[0,2,1,3][t&3]}:s.shape==="comparator"&&e===2?{tex:t&8&&s.textures.top_on?s.textures.top_on:s.textures.top,rot:[0,2,1,3][t&3]}:s.shape==="door"?{tex:(t&8)!==0?s.textures.top:s.textures.bottom,rot:0}:{tex:i[e],rot:0}}var br=[2,3,5,4,1,0,2,2];function Xa(s,t){let[e,i,n,r,o,a]=s;switch(t){case 2:return s;case 3:return[e,1-o,n,r,1-i,a];case 4:return[e,n,i,r,a,o];case 5:return[e,n,1-o,r,a,1-i];case 0:return[i,e,n,o,r,a];case 1:return[1-o,e,n,1-i,r,a]}return s}function ad(s,t,e,i){switch(s){case 0:return[1-i,e];case 1:return[i,e];case 2:return[t,1-i];case 3:return[1-t,1-i];case 4:return[t,e];default:return[1-t,e]}}var lh=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],ld=lh.map((s,t)=>lh.map((e,i)=>{if(i>>1===t>>1)return 0;let n=[.5+e[0]*.5+s[0]*.5,.5+e[1]*.5+s[1]*.5,.5+e[2]*.5+s[2]*.5],[r,o]=ad(i,n[0],n[1],n[2]);for(let a=0;a<4;a++){if(Math.abs(o-1)<1e-6&&Math.abs(r-.5)<1e-6)return a;let l=r;r=o,o=1-l}return 0}));var ui={NONE:0,NOTIFY:1,LIGHT:2,REMESH:4,EVENT:8,ALL:15,KEEP_DRY:16},Ie=(s,t)=>(s&65535)<<16|t&65535,ph=new Map;function cd(s){let t=ph.get(s);if(t)return t;let e=[],i=Math.ceil(s);for(let n=-i;n<=i;n++)for(let r=-i;r<=i;r++){let o=n*n+r*r;o<=s*s&&e.push([o,n,r])}return e.sort((n,r)=>n[0]-r[0]),t=new Int32Array(e.length*3),e.forEach((n,r)=>{t[r*3]=n[1],t[r*3+1]=n[2],t[r*3+2]=n[0]}),ph.set(s,t),t}var mh=class{constructor(t,e={}){this.game=t,this.seed=e.seed??0,this.worldId=e.worldId??"default",this.dimension=e.dimension??"overworld",this.gen=e.gen??sh(t?.worldMeta),this.chunks=new Map,this.light=new vr(this),this.pendingGen=new Set,this.genQueueLength=0,this.lightQueue=[],this.renderDistance=e.renderDistance??8,this.workers=[],this.workerBusy=[],this.genRequests=new Map,this.nextReqId=1,this.centerCX=0,this.centerCZ=0,this.meshBudgetMs=6,this.lightBudgetMs=4,this.stats={generated:0,meshed:0,lit:0,lightMs:0,meshMs:0,genMs:0,dispatched:0,synced:0,unloaded:0},this.genComplete=!1,this.frame=0,this._cands=[],this._lastUpdate=0,this.createWorkers(e.workerCount)}createWorkers(t){let e=t||Math.max(1,Math.min(4,(navigator.hardwareConcurrency||4)-1));for(let i=0;i<e;i++){let n=new Worker(new URL("./worldgen.worker.js",import.meta.url),{type:"module"});n.onmessage=r=>this.onWorkerMessage(i,r.data),n.onerror=r=>console.error("worldgen worker error",r),this.workers.push(n),this.workerBusy.push(0)}}dispose(){for(let t of this.workers)t.terminate();this.workers=[],this.chunks.clear(),this.lightQueue.length=0,this.pendingGen.clear()}getChunk(t,e){return this.chunks.get(Ie(t,e))}getChunkAt(t,e){return this.chunks.get(Ie(t>>4,e>>4))}isLoaded(t,e){let i=this.getChunkAt(t,e);return!!i&&i.state>=Je.LIT}getBlock(t,e,i){if(e<0)return Re.bedrock;if(e>=256)return 0;let n=this.chunks.get(Ie(t>>4,i>>4));return n?n.blocks[e<<8|(i&15)<<4|t&15]:0}getMeta(t,e,i){if(e<0||e>=256)return 0;let n=this.chunks.get(Ie(t>>4,i>>4));return n?n.meta[e<<8|(i&15)<<4|t&15]:0}getBlockDef(t,e,i){return gt[this.getBlock(t,e,i)]}getLight(t,e,i){if(e>=256)return 240;if(e<0)return 0;let n=this.chunks.get(Ie(t>>4,i>>4));return n?n.light[e<<8|(i&15)<<4|t&15]:240}getSkyLight(t,e,i){return this.getLight(t,e,i)>>4}getBlockLight(t,e,i){return this.getLight(t,e,i)&15}getLightLevel(t,e,i,n=this.game?.sky?.skyDarken??0){let r=this.getLight(t,e,i);return Math.max((r>>4)-n,r&15)}getBiome(t,e){let i=this.getChunkAt(t,e);return i?i.biomes[(e&15)<<4|t&15]:0}getHeight(t,e){let i=this.getChunkAt(t,e);if(!i)return 0;for(let n=255;n>=0;n--){let r=i.blocks[n<<8|(e&15)<<4|t&15];if(r!==0&&(Se[r]||gt[r].liquid))return n+1}return 0}isSolid(t,e,i){return Se[this.getBlock(t,e,i)]===1}isOpaque(t,e,i){return oi[this.getBlock(t,e,i)]===1}isWaterlogged(t,e,i){if(e<0||e>=256)return!1;let n=this.chunks.get(Ie(t>>4,i>>4));if(!n)return!1;let r=e<<8|(i&15)<<4|t&15;return Va[n.blocks[r]]===1||n.isWaterloggedAt(r)}canWaterlog(t,e,i){let n=this.getBlock(t,e,i);return Ya(n,this.getMeta(t,e,i))}setWaterlogged(t,e,i,n,r=ui.ALL){if(e<0||e>=256)return!1;let o=this.chunks.get(Ie(t>>4,i>>4));if(!o)return!1;let a=e<<8|(i&15)<<4|t&15,l=o.blocks[a],c=o.meta[a],h=o.isWaterloggedAt(a);if(!!n===h||n&&!Ya(l,c))return!1;let f=wr(l,h),u=wr(l,!!n);return o.setWaterloggedAt(a,!!n),o.modified=!0,r&ui.LIGHT&&f!==u&&this.light.onBlockChanged(t,e,i,l,l,f,u),r&ui.REMESH&&this.markDirtyAround(t,e,i),r&ui.EVENT&&this.game?.events.emit("blockChange",{x:t,y:e,z:i,oldId:l,oldMeta:c,id:l,meta:c,flags:r,waterlogged:!!n}),!0}getFluidId(t,e,i){let n=this.getBlock(t,e,i);return gt[n].liquid?n:this.isWaterlogged(t,e,i)?Re.water:0}getFluidMeta(t,e,i){let n=this.getBlock(t,e,i);return gt[n].liquid?this.getMeta(t,e,i):0}setBlock(t,e,i,n,r=0,o=ui.ALL){if(e<0||e>=256)return!1;let a=this.chunks.get(Ie(t>>4,i>>4));if(!a)return!1;let l=t&15,c=i&15,h=e<<8|c<<4|l,f=a.blocks[h],u=a.meta[h],d=a.water!==null&&a.isWaterloggedAt(h);n===0&&(d||Va[f])&&!(o&ui.KEEP_DRY)&&f!==0&&(n=Re.water,r=0);let g=Ya(n,r)&&(d||f===Re.water&&u===0&&f!==n);if(f===n&&u===r&&d===g)return!1;a.setRaw(l,e,c,n,r),d!==g&&a.setWaterloggedAt(h,g),a.modified=!0;let _;if(f!==n&&gt[f].hasBlockEntity&&!gt[n].hasBlockEntity&&(_=a.blockEntities.get(h),a.blockEntities.delete(h)),o&ui.LIGHT){let m=wr(f,d),p=wr(n,g);(f!==n||m!==p)&&this.light.onBlockChanged(t,e,i,f,n,m,p)}return o&ui.REMESH&&this.markDirtyAround(t,e,i),o&ui.EVENT&&this.game?.events.emit("blockChange",{x:t,y:e,z:i,oldId:f,oldMeta:u,id:n,meta:r,flags:o,oldBlockEntity:_,waterlogged:g!==d?g:void 0}),!0}setMeta(t,e,i,n,r=ui.ALL){return this.setBlock(t,e,i,this.getBlock(t,e,i),n,r)}getBlockEntity(t,e,i){let n=this.getChunkAt(t,i);return n?n.blockEntities.get(e<<8|(i&15)<<4|t&15):void 0}setBlockEntity(t,e,i,n){let r=this.getChunkAt(t,i);r&&(r.blockEntities.set(e<<8|(i&15)<<4|t&15,n),r.modified=!0,this.game?.sim?.blockEntityChanged?.(t,e,i))}removeBlockEntity(t,e,i){let n=this.getChunkAt(t,i);n&&(n.blockEntities.delete(e<<8|(i&15)<<4|t&15),n.modified=!0)}forEachBlockEntity(t){for(let e of this.chunks.values())for(let[i,n]of e.blockEntities)t(e.cx<<4|i&15,i>>8,e.cz<<4|i>>4&15,n,e)}onLightChanged(t,e,i,n){t.meshedOnce&&this.markDirtyAround(e,i,n)}markDirtyAround(t,e,i){let n=t&15,r=e&15,o=i&15,a=t>>4,l=i>>4,c=e>>4;if(n>0&&n<15&&o>0&&o<15&&r>0&&r<15){let m=this.chunks.get(Ie(a,l));m&&(m.dirty[c]=1);return}let h=n===0?-1:0,f=n===15?1:0,u=r===0?-1:0,d=r===15?1:0,g=o===0?-1:0,_=o===15?1:0;for(let m=h;m<=f;m++)for(let p=g;p<=_;p++){let S=this.chunks.get(Ie(a+m,l+p));if(S)for(let E=u;E<=d;E++){let y=c+E;y>=0&&y<16&&(S.dirty[y]=1)}}}requestChunk(t,e){let i=Ie(t,e);if(this.pendingGen.has(i)||this.chunks.has(i))return;this.pendingGen.add(i);let n=this.game?.storage,r=o=>{if(this.pendingGen.has(i)){if(o){this.pendingGen.delete(i),this.acceptChunkData(o,!0);return}this.dispatchGen(t,e)}};n&&n.loadChunk?n.loadChunk(this.worldId,this.dimension,t,e).then(r,()=>r(null)):r(null)}dispatchGen(t,e){let i=0;for(let r=1;r<this.workers.length;r++)this.workerBusy[r]<this.workerBusy[i]&&(i=r);let n=this.nextReqId++;this.genRequests.set(n,{cx:t,cz:e}),this.workerBusy[i]++,this.workers[i].postMessage({type:"generate",id:n,cx:t,cz:e,seed:this.seed,dimension:this.dimension,gen:this.gen})}onWorkerMessage(t,e){if(e.type==="log"){console.log("[worldgen]",...e.args);return}if(e.type!=="chunk")return;this.workerBusy[t]--,this.genRequests.delete(e.id);let i=Ie(e.cx,e.cz);if(!this.pendingGen.has(i)){this.pumpGen();return}this.pendingGen.delete(i),this.acceptChunkData(e,!1),this.pumpGen()}acceptChunkData(t,e){let i=performance.now(),n=new xr(t.cx,t.cz,e?null:t);n.blocks!==t.blocks&&n.blocks.set(t.blocks),n.meta!==t.meta&&n.meta.set(t.meta),t.biomes&&n.biomes.set(t.biomes);let r=t.water||t.waterlogged;if(r&&r.length===n.blocks.length>>3&&(n.water=new Uint8Array(r),n.water.some(a=>a)||(n.water=null)),t.blockEntities)for(let[a,l]of Object.entries(t.blockEntities))n.blockEntities.set(+a,l);if(n.savedEntities=t.entities||null,n.light!==t.light){let a=performance.now();ah(n.blocks,n.water,n.light),this.stats.lightMs+=performance.now()-a}!e&&t.sectionNonAir?.length===16?n.sectionNonAir.set(t.sectionNonAir):n.recountSections(),!e&&t.heightMap?.length===256&&!n.water?n.heightMap.set(t.heightMap):n.computeHeightMap(),n.state=Je.GENERATED,n.modified=!1,this.chunks.set(Ie(n.cx,n.cz),n),this.stats.generated++;let o=performance.now();for(let a=0;a<4;a++){let l=this.getChunk(n.cx+(a===0?1:a===1?-1:0),n.cz+(a===2?1:a===3?-1:0));l&&this.light.stitch(n,l)}this.stats.lightMs+=performance.now()-o;for(let a=-1;a<=1;a++)for(let l=-1;l<=1;l++){let c=this.getChunk(n.cx+a,n.cz+l);c&&c.state===Je.GENERATED&&this.neighboursGenerated(c)&&this.markLit(c)}this.stats.genMs+=performance.now()-i,this.game?.events.emit("chunkLoaded",{chunk:n,fromSave:e})}markLit(t){t.state=Je.LIT,this.stats.lit++;for(let e=-1;e<=1;e++)for(let i=-1;i<=1;i++){let n=this.getChunk(t.cx+e,t.cz+i);n&&n.state===Je.LIT&&!n.meshedOnce&&!n.meshable&&this.neighboursLit(n)&&(n.dirty.fill(1),n.meshable=!0)}this.game?.events.emit("chunkLit",{chunk:t})}neighboursGenerated(t){for(let e=-1;e<=1;e++)for(let i=-1;i<=1;i++){if(!e&&!i)continue;let n=this.getChunk(t.cx+e,t.cz+i);if(!n||n.state<Je.GENERATED)return!1}return!0}neighboursLit(t){for(let e=-1;e<=1;e++)for(let i=-1;i<=1;i++){if(!e&&!i)continue;let n=this.getChunk(t.cx+e,t.cz+i);if(!n||n.state<Je.LIT)return!1}return!0}processLighting(t){if(!this.lightQueue.length)return;let e=performance.now(),i=this.centerCX,n=this.centerCZ;if(this.lightQueue.length>1){for(let o of this.lightQueue)o._ld=(o.cx-i)**2+(o.cz-n)**2;this.lightQueue.sort((o,a)=>o._ld-a._ld)}let r=0;for(;r<this.lightQueue.length&&performance.now()-e<t;){let o=this.lightQueue[r++];if(o.queuedLight=!1,!(this.getChunk(o.cx,o.cz)!==o||o.state!==Je.GENERATED)){this.light.lightChunk(o),o.state=Je.LIT,this.stats.lit++;for(let a=-1;a<=1;a++)for(let l=-1;l<=1;l++){let c=this.getChunk(o.cx+a,o.cz+l);c&&c.state===Je.LIT&&(c.meshedOnce?c.dirty.fill(1):this.neighboursLit(c)&&(c.dirty.fill(1),c.meshable=!0))}this.game?.events.emit("chunkLit",{chunk:o})}}this.lightQueue.splice(0,r),this.stats.lightMs+=performance.now()-e}update(t,e){let i=performance.now(),n=this._lastUpdate?i-this._lastUpdate:16;this._lastUpdate=i,this.frame++;let r=Math.floor(t)>>4,o=Math.floor(e)>>4,a=r!==this.centerCX||o!==this.centerCZ;this.centerCX=r,this.centerCZ=o;let c=this.renderDistance+3.4;if((a||this._genR!==c)&&(this.genComplete=!1,this._genR=c,this.genCursor=0),a&&(this.genCursor=0),this.pumpGen(),a||(this.frame&31)===0){let d=c+2;for(let g of this.chunks.values()){let _=g.cx-r,m=g.cz-o;_*_+m*m>d*d&&!this.forcedKeys?.has(Ie(g.cx,g.cz))&&this.unloadChunk(g)}for(let g of this.pendingGen){if(this.forcedKeys?.has(g))continue;let _=g>>16<<16>>16,m=g<<16>>16,p=_-r,S=m-o;p*p+S*S>d*d&&this.pendingGen.delete(g)}}let h=this.game?.state==="loading",f=n>24?.5:1;this.game?.chunkRenderer?.update?.(h?12:4),this.processLighting(h?12:this.lightBudgetMs*f),this.processMeshing(h?12:this.meshBudgetMs*f)}pumpGen(){if(this.genComplete)return;let t=this.workers.length*3;if(this.pendingGen.size>=t)return;let e=cd(this._genR||this.renderDistance+3.4),i=this.centerCX,n=this.centerCZ,r=this.genCursor|0,o=!0;for(;r<e.length;r+=3){let a=Ie(i+e[r],n+e[r+1]);if(this.chunks.has(a)){o&&(this.genCursor=r+3);continue}if(o=!1,!this.pendingGen.has(a)){if(this.pendingGen.size>=t)return;this.requestChunk(i+e[r],n+e[r+1])}}if(this.forced){for(let[a,l,c]of this.forced)if(!this.chunks.has(a)&&(o=!1,!this.pendingGen.has(a))){if(this.pendingGen.size>=t)return;this.requestChunk(l,c)}}o&&(this.genComplete=!0)}forceLoadArea(t,e,i){this.forced=this.forced||[],this.forcedKeys=this.forcedKeys||new Set;for(let n=-i;n<=i;n++)for(let r=-i;r<=i;r++){let o=Ie(t+n,e+r);this.forcedKeys.has(o)||(this.forcedKeys.add(o),this.forced.push([o,t+n,e+r]))}this.genComplete=!1}get meshPending(){let t=0;for(let e of this.chunks.values())if(t+=e.meshPending|0,e.meshable||e.meshedOnce)for(let i=0;i<16;i++)t+=e.dirty[i];return t}processMeshing(t){let e=this.game?.chunkRenderer;if(!e)return;let i=performance.now(),r=(this.renderDistance+.5)**2,o=this._cands;o.length=0;for(let l of this.chunks.values()){if(l.state!==Je.LIT)continue;let c=l.cx-this.centerCX,h=l.cz-this.centerCZ,f=c*c+h*h;if(f>r){l.meshedOnce&&(e.removeChunk(l.cx,l.cz),l.meshedOnce=!1,l.dirty.fill(1));continue}if(!l.meshedOnce&&!l.meshable)if(this.neighboursLit(l))l.meshable=!0,l.dirty.fill(1);else continue;let u=l.dirty,d=!1;for(let g=0;g<16;g++)if(u[g]){d=!0;break}d&&(l._md=f-(l.meshedOnce?1e3:0),o.push(l))}if(!o.length)return;o.sort((l,c)=>l._md-c._md);let a=!e.pool||e.pool.failed||!e.pool.ready&&this.frame>600;(this._queueCX!==this.centerCX||this._queueCZ!==this.centerCZ)&&(this._queueCX=this.centerCX,this._queueCZ=this.centerCZ,e.sortQueue?.(this.centerCX,this.centerCZ)),e.stageBegin?.();for(let l of o){let c=l.meshedOnce&&Math.abs(l.cx-this.centerCX)<=1&&Math.abs(l.cz-this.centerCZ)<=1,h=!1;for(let f=0;f<16;f++){if(!l.dirty[f])continue;let u=performance.now()-i<t,d=(l.mainOnlyMask|0)&1<<f;(c||a||d)&&u?(l.dirty[f]=0,e.buildSection(l,f),this.stats.synced++,this.stats.meshed++):!d&&e.dispatchSection(l,f)?(l.dirty[f]=0,this.stats.dispatched++,this.stats.meshed++):h=!0}h||(l.meshedOnce=!0)}e.stageEnd?.(),this.stats.meshMs+=performance.now()-i}unloadChunk(t){let e=Ie(t.cx,t.cz);this.game?.events.emit("chunkUnload",{chunk:t}),t.modified&&this.game?.storage?.saveChunk&&(this.game.storage.saveChunk(this.worldId,this.dimension,t),t.modified=!1),this.game?.chunkRenderer?.removeChunk(t.cx,t.cz),this.chunks.delete(e),this.genComplete=!1,this.genCursor=0,this.stats.unloaded++}saveAll(){let t=this.game?.storage;if(!t?.saveChunk)return Promise.resolve();let e=[];for(let i of this.chunks.values())i.modified&&(e.push(t.saveChunk(this.worldId,this.dimension,i)),i.modified=!1);return Promise.all(e)}readiness(t,e,i=2){let n=Math.floor(t)>>4,r=Math.floor(e)>>4,o=0,a=0;for(let l=-i;l<=i;l++)for(let c=-i;c<=i;c++){o++;let h=this.getChunk(n+l,r+c);h&&h.meshedOnce&&!h.meshPending&&a++}return a/o}perfInfo(){let t=0;for(let n of this.chunks.values())n.meshedOnce&&t++;let e=this.game?.chunkRenderer?.info?.(),i=this.stats;return`Chunks: gen ${this.pendingGen.size} light ${this.lightQueue.length} meshed ${t}/${this.chunks.size}`+(e?`
Sections: ${e.sections} drawn ${e.drawn.join("/")} mesh workers ${e.workers} (${e.inFlight} busy) GPU ${e.gpuMB}MB`:"")+`
Meshes: ${i.synced} main ${i.dispatched} worker, light ${(this.light.stats.ms/Math.max(1,this.light.stats.chunks)).toFixed(2)} ms/chunk`}raycast(t,e,i,n,r,o,a,l=hd){let c=Math.hypot(n,r,o)||1;n/=c,r/=c,o/=c;let h=Math.floor(t),f=Math.floor(e),u=Math.floor(i),d=n>0?1:-1,g=r>0?1:-1,_=o>0?1:-1,m=Math.abs(1/n),p=Math.abs(1/r),S=Math.abs(1/o),E=n>0?(h+1-t)*m:(t-h)*m,y=r>0?(f+1-e)*p:(e-f)*p,b=o>0?(u+1-i)*S:(i-u)*S;isFinite(E)||(E=1/0),isFinite(y)||(y=1/0),isFinite(b)||(b=1/0);let w=0,R=(v,T,I)=>this.getBlock(h+v,f+T,u+I);for(let v=0;v<256&&w<=a;v++){let T=this.getBlock(h,f,u);if(T!==0){let I=gt[T],L=l.fluids&&I.liquid&&(l.anyFluid||(this.getMeta(h,f,u)&7)===0);if(I.selectable||L){let F=this.getMeta(h,f,u),B=1/0,P=-1;if(L||I.shape==="cube")Za(t,e,i,n,r,o,h,f,u,h+1,f+1,u+1,wn)&&(B=wn.t,P=wn.face);else{let z=hh(I,F,R);for(let Y=0;Y<z.length;Y++){let q=z[Y];Za(t,e,i,n,r,o,h+q[0],f+q[1],u+q[2],h+q[3],f+q[4],u+q[5],wn)&&wn.t<B&&(B=wn.t,P=wn.face)}}if(P>=0&&B<=a){let z=ud[P];return{x:h,y:f,z:u,id:T,meta:F,def:I,face:P,t:B,point:[t+n*B,e+r*B,i+o*B],normal:z,place:[h+z[0],f+z[1],u+z[2]]}}}}E<y?E<b?(h+=d,w=E,E+=m):(u+=_,w=b,b+=S):y<b?(f+=g,w=y,y+=p):(u+=_,w=b,b+=S)}return null}},hd=Object.freeze({}),wn={t:0,face:0},ud=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];function Ya(s,t){return eh[s]===1&&!(t===2&&gt[s].shape==="slab")}function wr(s,t){let e=We[s];return t&&e===0?1:e}function Za(s,t,e,i,n,r,o,a,l,c,h,f,u){let d=-1/0,g=1/0,_=-1;if(Math.abs(i)<1e-9){if(s<o||s>c)return!1}else{let m=(o-s)/i,p=(c-s)/i,S=1;if(m>p){let E=m;m=p,p=E,S=0}if(m>d&&(d=m,_=S),p<g&&(g=p),d>g)return!1}if(Math.abs(n)<1e-9){if(t<a||t>h)return!1}else{let m=(a-t)/n,p=(h-t)/n,S=3;if(m>p){let E=m;m=p,p=E,S=2}if(m>d&&(d=m,_=S),p<g&&(g=p),d>g)return!1}if(Math.abs(r)<1e-9){if(e<l||e>f)return!1}else{let m=(l-e)/r,p=(f-e)/r,S=5;if(m>p){let E=m;m=p,p=E,S=4}if(m>d&&(d=m,_=S),p<g&&(g=p),d>g)return!1}return g<0?!1:(u.t=Math.max(0,d),u.face=_<0?2:_,!0)}function Gx(s,t,e,i,n,r,o,a,l,c,h,f){let u={t:0,face:0};return Za(s,t,e,i,n,r,o,a,l,c,h,f,u)?u:null}var Ja=Object.create(null);function $e(s,t){for(let e of Array.isArray(s)?s:[s])Ja[e]=Object.assign(Ja[e]||{},t)}function gh(s){return Ja[s]}var Es=Object.create(null);function $a(s,t){for(let e of Array.isArray(s)?s:[s])Es[e]=Object.assign(Es[e]||{},t)}function fi(s){return Es[s]}var Yh=0,Hl=1,Zh=2;var ir=1,Jh=2,us=3,un=0,He=1,Pi=2,Li=0,fs=1,Gl=2,Wl=3,Xl=4,$h=5;var Pn=100,Kh=101,Qh=102,jh=103,tu=104,eu=200,iu=201,nu=202,su=203,ql=204,Yl=205,ru=206,ou=207,au=208,lu=209,cu=210,hu=211,uu=212,fu=213,du=214,Qr=0,jr=1,to=2,rs=3,eo=4,io=5,no=6,so=7,Zl=0,pu=1,mu=2,xi=0,Jl=1,$l=2,Kl=3,Ql=4,jl=5,tc=6,ec=7,bl="attached",gu="detached",ic=300,fn=301,Ln=302,Fo=303,Bo=304,nr=306,ro=1e3,Ai=1001,oo=1002,Ce=1003,_u=1004;var sr=1005;var Pe=1006,Oo=1007;var dn=1008;var ni=1009,nc=1010,sc=1011,ds=1012,ko=1013,vi=1014,li=1015,yi=1016,zo=1017,Vo=1018,ps=1020,rc=35902,oc=35899,ac=1021,lc=1022,si=1023,Ci=1026,pn=1027,cc=1028,Ho=1029,mn=1030,Go=1031;var Wo=1033,rr=33776,or=33777,ar=33778,lr=33779,Xo=35840,qo=35841,Yo=35842,Zo=35843,Jo=36196,$o=37492,Ko=37496,Qo=37488,jo=37489,cr=37490,ta=37491,ea=37808,ia=37809,na=37810,sa=37811,ra=37812,oa=37813,aa=37814,la=37815,ca=37816,ha=37817,ua=37818,fa=37819,da=37820,pa=37821,ma=36492,ga=36494,_a=36495,xa=36283,va=36284,hr=36285,ya=36286;var Fs=2300,ao=2301,$r=2302,wl=2303,Tl=2400,El=2401,Al=2402;var xu=3200;var hc=0,vu=1,Yi="",je="srgb",Bs="srgb-linear",Os="linear",Qt="srgb";var Kr=7680;var yu=519,Mu=512,Su=513,bu=514,Ma=515,wu=516,Tu=517,Sa=518,Eu=519,uc=35044,fd=35048;var fc="300 es",_i=2e3,ks=2001;function dd(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function pd(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function zs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Au(){let s=zs("canvas");return s.style.display="block",s}var _h={},os=null;function Vs(...s){let t="THREE."+s.shift();os?os("log",t,...s):console.log(t,...s)}function Cu(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Rt(...s){s=Cu(s);let t="THREE."+s.shift();if(os)os("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Pt(...s){s=Cu(s);let t="THREE."+s.shift();if(os)os("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function In(...s){let t=s.join(" ");t in _h||(_h[t]=!0,Rt(...s))}function Ru(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Iu={[Qr]:jr,[to]:no,[eo]:so,[rs]:io,[jr]:Qr,[no]:to,[so]:eo,[io]:rs},Ri=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,o=n.length;r<o;r++)n[r].call(this,t);t.target=null}}},Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ka=Math.PI/180,lo=180/Math.PI;function Hi(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function Xt(s,t,e){return Math.max(t,Math.min(e,s))}function md(s,t){return(s%t+t)%t}function Qa(s,t,e){return(1-e)*s+e*t}function Ei(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ie(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ft=class s{static{s.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Xt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*n+t.x,this.y=r*n+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ii=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,o,a){let l=i[n+0],c=i[n+1],h=i[n+2],f=i[n+3],u=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(f!==_||l!==u||c!==d||h!==g){let m=l*u+c*d+h*g+f*_;m<0&&(u=-u,d=-d,g=-g,_=-_,m=-m);let p=1-a;if(m<.9995){let S=Math.acos(m),E=Math.sin(S);p=Math.sin(p*S)/E,a=Math.sin(a*S)/E,l=l*p+u*a,c=c*p+d*a,h=h*p+g*a,f=f*p+_*a}else{l=l*p+u*a,c=c*p+d*a,h=h*p+g*a,f=f*p+_*a;let S=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=S,c*=S,h*=S,f*=S}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,n,r,o){let a=i[n],l=i[n+1],c=i[n+2],h=i[n+3],f=r[o],u=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*f+l*d-c*u,t[e+1]=l*g+h*u+c*f-a*d,t[e+2]=c*g+h*d+a*u-l*f,t[e+3]=h*g-a*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(n/2),f=a(r/2),u=l(i/2),d=l(n/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=i+a+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-n)*d}else if(i>a&&i>f){let d=2*Math.sqrt(1+i-a-f);this._w=(h-l)/d,this._x=.25*d,this._y=(n+o)/d,this._z=(r+c)/d}else if(a>f){let d=2*Math.sqrt(1+a-i-f);this._w=(r-c)/d,this._x=(n+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-i-a);this._w=(o-n)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+n*c-r*l,this._y=n*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-n*a,this._w=o*h-i*a-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,n=-n,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class s{static{s.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*n-a*i),h=2*(a*e-r*n),f=2*(r*i-o*e);return this.x=e+l*c+o*f-a*h,this.y=i+l*h+a*c-r*f,this.z=n+l*f+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=n*l-r*a,this.y=r*o-i*l,this.z=i*a-n*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ja.copy(this).projectOnVector(t),this.sub(ja)}reflect(t){return this.sub(ja.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Xt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ja=new k,xh=new Ii,Lt=class s{static{s.prototype.isMatrix3=!0}constructor(t,e,i,n,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,o,a,l,c)}set(t,e,i,n,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],d=i[5],g=i[8],_=n[0],m=n[3],p=n[6],S=n[1],E=n[4],y=n[7],b=n[2],w=n[5],R=n[8];return r[0]=o*_+a*S+l*b,r[3]=o*m+a*E+l*w,r[6]=o*p+a*y+l*R,r[1]=c*_+h*S+f*b,r[4]=c*m+h*E+f*w,r[7]=c*p+h*y+f*R,r[2]=u*_+d*S+g*b,r[5]=u*m+d*E+g*w,r[8]=u*p+d*y+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+n*r*c-n*o*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=h*o-a*c,u=a*l-h*r,d=c*r-o*l,g=e*f+i*u+n*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=f*_,t[1]=(n*c-h*i)*_,t[2]=(a*i-n*o)*_,t[3]=u*_,t[4]=(h*e-n*l)*_,t[5]=(n*r-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-n*c,n*l,-n*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return In("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(tl.makeScale(t,e)),this}rotate(t){return In("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(tl.makeRotation(-t)),this}translate(t,e){return In("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(tl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},tl=new Lt,vh=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yh=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gd(){let s={enabled:!0,workingColorSpace:Bs,spaces:{},convert:function(n,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Qt&&(n.r=Gi(n.r),n.g=Gi(n.g),n.b=Gi(n.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Qt&&(n.r=ss(n.r),n.g=ss(n.g),n.b=ss(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Yi?Os:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,o){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return In("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return In("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Bs]:{primaries:t,whitePoint:i,transfer:Os,toXYZ:vh,fromXYZ:yh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:je},outputColorSpaceConfig:{drawingBufferColorSpace:je}},[je]:{primaries:t,whitePoint:i,transfer:Qt,toXYZ:vh,fromXYZ:yh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:je}}}),s}var Gt=gd();function Gi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ss(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Vn,co=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Vn===void 0&&(Vn=zs("canvas")),Vn.width=t.width,Vn.height=t.height;let n=Vn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=Vn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=zs("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let o=0;o<r.length;o++)r[o]=Gi(r[o]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Gi(e[i]/255)*255):e[i]=Gi(e[i]);return{data:e,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},_d=0,as=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=Hi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?r.push(el(n[o].image)):r.push(el(n[o]))}else r=el(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function el(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?co.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var xd=0,il=new k,ke=class s extends Ri{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=Ai,n=Ai,r=Pe,o=dn,a=si,l=ni,c=s.DEFAULT_ANISOTROPY,h=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=Hi(),this.name="",this.source=new as(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(il).x}get height(){return this.source.getSize(il).y}get depth(){return this.source.getSize(il).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Rt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Rt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ic)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ro:t.x=t.x-Math.floor(t.x);break;case Ai:t.x=t.x<0?0:1;break;case oo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ro:t.y=t.y-Math.floor(t.y);break;case Ai:t.y=t.y<0?0:1;break;case oo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=ic;ke.DEFAULT_ANISOTROPY=1;var ne=class s{static{s.prototype.isVector4=!0}constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*n+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*n+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*n+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*n+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,y=(d+1)/2,b=(p+1)/2,w=(h+u)/4,R=(f+_)/4,v=(g+m)/4;return E>y&&E>b?E<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(E),n=w/i,r=R/i):y>b?y<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(y),i=w/n,r=v/n):b<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(b),i=R/r,n=v/r),this.set(i,n,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(f-_)/S,this.z=(u-h)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ho=class extends Ri{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ne(0,0,t,e),this.scissorTest=!1,this.viewport=new ne(0,0,t,e),this.textures=[];let n={width:t,height:e,depth:i.depth},r=new ke(n),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Pe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new as(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ye=class extends ho{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Hs=class extends ke{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var uo=class extends ke{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var kt=class s{static{s.prototype.isMatrix4=!0}constructor(t,e,i,n,r,o,a,l,c,h,f,u,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,o,a,l,c,h,f,u,d,g,_,m)}set(t,e,i,n,r,o,a,l,c,h,f,u,d,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/Hn.setFromMatrixColumn(t,0).length(),r=1/Hn.setFromMatrixColumn(t,1).length(),o=1/Hn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=o*h,d=o*f,g=a*h,_=a*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,g=c*h,_=c*f;e[0]=u+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,g=c*h,_=c*f;e[0]=u-_*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,d=o*f,g=a*h,_=a*f;e[0]=l*h,e[4]=g*c-d,e[8]=u*c+_,e[1]=l*f,e[5]=_*c+u,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*f,e[8]=g*f+d,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*f+g,e[10]=u-_*f}else if(t.order==="XZY"){let u=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+_,e[5]=o*h,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*h,e[10]=_*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vd,t,yd)}lookAt(t,e,i){let n=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),tn.crossVectors(i,Ke),tn.lengthSq()===0&&(Math.abs(i.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),tn.crossVectors(i,Ke)),tn.normalize(),Tr.crossVectors(Ke,tn),n[0]=tn.x,n[4]=Tr.x,n[8]=Ke.x,n[1]=tn.y,n[5]=Tr.y,n[9]=Ke.y,n[2]=tn.z,n[6]=Tr.z,n[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],S=i[3],E=i[7],y=i[11],b=i[15],w=n[0],R=n[4],v=n[8],T=n[12],I=n[1],L=n[5],F=n[9],B=n[13],P=n[2],z=n[6],Y=n[10],q=n[14],it=n[3],X=n[7],j=n[11],et=n[15];return r[0]=o*w+a*I+l*P+c*it,r[4]=o*R+a*L+l*z+c*X,r[8]=o*v+a*F+l*Y+c*j,r[12]=o*T+a*B+l*q+c*et,r[1]=h*w+f*I+u*P+d*it,r[5]=h*R+f*L+u*z+d*X,r[9]=h*v+f*F+u*Y+d*j,r[13]=h*T+f*B+u*q+d*et,r[2]=g*w+_*I+m*P+p*it,r[6]=g*R+_*L+m*z+p*X,r[10]=g*v+_*F+m*Y+p*j,r[14]=g*T+_*B+m*q+p*et,r[3]=S*w+E*I+y*P+b*it,r[7]=S*R+E*L+y*z+b*X,r[11]=S*v+E*F+y*Y+b*j,r[15]=S*T+E*B+y*q+b*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15],S=l*d-c*u,E=a*d-c*f,y=a*u-l*f,b=o*d-c*h,w=o*u-l*h,R=o*f-a*h;return e*(_*S-m*E+p*y)-i*(g*S-m*b+p*w)+n*(g*E-_*b+p*R)-r*(g*y-_*w+m*R)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-i*(r*h-a*l)+n*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],S=e*a-i*o,E=e*l-n*o,y=e*c-r*o,b=i*l-n*a,w=i*c-r*a,R=n*c-r*l,v=h*_-f*g,T=h*m-u*g,I=h*p-d*g,L=f*m-u*_,F=f*p-d*_,B=u*p-d*m,P=S*B-E*F+y*L+b*I-w*T+R*v;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/P;return t[0]=(a*B-l*F+c*L)*z,t[1]=(n*F-i*B-r*L)*z,t[2]=(_*R-m*w+p*b)*z,t[3]=(u*w-f*R-d*b)*z,t[4]=(l*I-o*B-c*T)*z,t[5]=(e*B-n*I+r*T)*z,t[6]=(m*y-g*R-p*E)*z,t[7]=(h*R-u*y+d*E)*z,t[8]=(o*F-a*I+c*v)*z,t[9]=(i*I-e*F-r*v)*z,t[10]=(g*w-_*y+p*S)*z,t[11]=(f*y-h*w-d*S)*z,t[12]=(a*T-o*L-l*v)*z,t[13]=(e*L-i*T+n*v)*z,t[14]=(_*E-g*b-m*S)*z,t[15]=(h*b-f*E+u*S)*z,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-n*l,c*l+n*a,0,c*a+n*l,h*a+i,h*l-n*o,0,c*l-n*a,h*l+n*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,o){return this.set(1,i,r,0,t,1,o,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,f=a+a,u=r*c,d=r*h,g=r*f,_=o*h,m=o*f,p=a*f,S=l*c,E=l*h,y=l*f,b=i.x,w=i.y,R=i.z;return n[0]=(1-(_+p))*b,n[1]=(d+y)*b,n[2]=(g-E)*b,n[3]=0,n[4]=(d-y)*w,n[5]=(1-(u+p))*w,n[6]=(m+S)*w,n[7]=0,n[8]=(g+E)*R,n[9]=(m-S)*R,n[10]=(1-(u+_))*R,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=Hn.set(n[0],n[1],n[2]).length(),a=Hn.set(n[4],n[5],n[6]).length(),l=Hn.set(n[8],n[9],n[10]).length();r<0&&(o=-o),di.copy(this);let c=1/o,h=1/a,f=1/l;return di.elements[0]*=c,di.elements[1]*=c,di.elements[2]*=c,di.elements[4]*=h,di.elements[5]*=h,di.elements[6]*=h,di.elements[8]*=f,di.elements[9]*=f,di.elements[10]*=f,e.setFromRotationMatrix(di),i.x=o,i.y=a,i.z=l,this}makePerspective(t,e,i,n,r,o,a=_i,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(i-n),u=(e+t)/(e-t),d=(i+n)/(i-n),g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===_i)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===ks)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,o,a=_i,l=!1){let c=this.elements,h=2/(e-t),f=2/(i-n),u=-(e+t)/(e-t),d=-(i+n)/(i-n),g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===_i)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===ks)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Hn=new k,di=new kt,vd=new k(0,0,0),yd=new k(1,1,1),tn=new k,Tr=new k,Ke=new k,Mh=new kt,Sh=new Ii,on=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],o=n[4],a=n[8],l=n[1],c=n[5],h=n[9],f=n[2],u=n[6],d=n[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Mh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sh.setFromEuler(this),this.setFromQuaternion(Sh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};on.DEFAULT_ORDER="XYZ";var Gs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Md=0,bh=new k,Gn=new Ii,Fi=new kt,Er=new k,As=new k,Sd=new k,bd=new Ii,wh=new k(1,0,0),Th=new k(0,1,0),Eh=new k(0,0,1),Ah={type:"added"},wd={type:"removed"},Wn={type:"childadded",child:null},nl={type:"childremoved",child:null},ze=class s extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=Hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new k,e=new on,i=new Ii,n=new k(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new kt},normalMatrix:{value:new Lt}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gn.setFromAxisAngle(t,e),this.quaternion.multiply(Gn),this}rotateOnWorldAxis(t,e){return Gn.setFromAxisAngle(t,e),this.quaternion.premultiply(Gn),this}rotateX(t){return this.rotateOnAxis(wh,t)}rotateY(t){return this.rotateOnAxis(Th,t)}rotateZ(t){return this.rotateOnAxis(Eh,t)}translateOnAxis(t,e){return bh.copy(t).applyQuaternion(this.quaternion),this.position.add(bh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wh,t)}translateY(t){return this.translateOnAxis(Th,t)}translateZ(t){return this.translateOnAxis(Eh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Er.copy(t):Er.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),As.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(As,Er,this.up):Fi.lookAt(Er,As,this.up),this.quaternion.setFromRotationMatrix(Fi),n&&(Fi.extractRotation(n.matrixWorld),Gn.setFromRotationMatrix(Fi),this.quaternion.premultiply(Gn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Pt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ah),Wn.child=t,this.dispatchEvent(Wn),Wn.child=null):Pt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wd),nl.child=t,this.dispatchEvent(nl),nl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ah),Wn.child=t,this.dispatchEvent(Wn),Wn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,t,Sd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,bd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(a=>({...a})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));n.material=a}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];n.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),f=o(t.shapes),u=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=n,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ze.DEFAULT_UP=new k(0,1,0);ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Rn=class extends ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},Td={type:"move"},ls=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Td)))}return a!==null&&(a.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Rn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},en={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function sl(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Wt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Gt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=Gt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Gt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=Gt.workingColorSpace){if(t=md(t,1),e=Xt(e,0,1),i=Xt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=sl(o,r,t+1/3),this.g=sl(o,r,t),this.b=sl(o,r,t-1/3)}return Gt.colorSpaceToWorking(this,n),this}setStyle(t,e=je){function i(r){r!==void 0&&parseFloat(r)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Rt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=je){let i=Pu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}copyLinearToSRGB(t){return this.r=ss(t.r),this.g=ss(t.g),this.b=ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=je){return Gt.workingToColorSpace(Ue.copy(this),t),Math.round(Xt(Ue.r*255,0,255))*65536+Math.round(Xt(Ue.g*255,0,255))*256+Math.round(Xt(Ue.b*255,0,255))}getHexString(t=je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Gt.workingColorSpace){Gt.workingToColorSpace(Ue.copy(this),e);let i=Ue.r,n=Ue.g,r=Ue.b,o=Math.max(i,n,r),a=Math.min(i,n,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let f=o-a;switch(c=h<=.5?f/(o+a):f/(2-o-a),o){case i:l=(n-r)/f+(n<r?6:0);break;case n:l=(r-i)/f+2;break;case r:l=(i-n)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Gt.workingColorSpace){return Gt.workingToColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=je){Gt.workingToColorSpace(Ue.copy(this),t);let e=Ue.r,i=Ue.g,n=Ue.b;return t!==je?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(en),this.setHSL(en.h+t,en.s+e,en.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(en),t.getHSL(Ar);let i=Qa(en.h,Ar.h,e),n=Qa(en.s,Ar.s,e),r=Qa(en.l,Ar.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ue=new Wt;Wt.NAMES=Pu;var Cl=class s{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Wt(t),this.near=e,this.far=i}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Rl=class extends ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},pi=new k,Bi=new k,rl=new k,Oi=new k,Xn=new k,qn=new k,Ch=new k,ol=new k,al=new k,ll=new k,cl=new ne,hl=new ne,ul=new ne,Vi=class s{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),pi.subVectors(t,e),n.cross(pi);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){pi.subVectors(n,e),Bi.subVectors(i,e),rl.subVectors(t,e);let o=pi.dot(pi),a=pi.dot(Bi),l=pi.dot(rl),c=Bi.dot(Bi),h=Bi.dot(rl),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Oi)===null?!1:Oi.x>=0&&Oi.y>=0&&Oi.x+Oi.y<=1}static getInterpolation(t,e,i,n,r,o,a,l){return this.getBarycoord(t,e,i,n,Oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Oi.x),l.addScaledVector(o,Oi.y),l.addScaledVector(a,Oi.z),l)}static getInterpolatedAttribute(t,e,i,n,r,o){return cl.setScalar(0),hl.setScalar(0),ul.setScalar(0),cl.fromBufferAttribute(t,e),hl.fromBufferAttribute(t,i),ul.fromBufferAttribute(t,n),o.setScalar(0),o.addScaledVector(cl,r.x),o.addScaledVector(hl,r.y),o.addScaledVector(ul,r.z),o}static isFrontFacing(t,e,i,n){return pi.subVectors(i,e),Bi.subVectors(t,e),pi.cross(Bi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pi.subVectors(this.c,this.b),Bi.subVectors(this.a,this.b),pi.cross(Bi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,o,a;Xn.subVectors(n,i),qn.subVectors(r,i),ol.subVectors(t,i);let l=Xn.dot(ol),c=qn.dot(ol);if(l<=0&&c<=0)return e.copy(i);al.subVectors(t,n);let h=Xn.dot(al),f=qn.dot(al);if(h>=0&&f<=h)return e.copy(n);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(Xn,o);ll.subVectors(t,r);let d=Xn.dot(ll),g=qn.dot(ll);if(g>=0&&d<=g)return e.copy(r);let _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(qn,a);let m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return Ch.subVectors(r,n),a=(f-h)/(f-h+(d-g)),e.copy(n).addScaledVector(Ch,a);let p=1/(m+_+u);return o=_*p,a=u*p,e.copy(i).addScaledVector(Xn,o).addScaledVector(qn,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Wi=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(mi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(mi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=mi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,mi):mi.fromBufferAttribute(r,o),mi.applyMatrix4(t.matrixWorld),this.expandByPoint(mi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Cr.copy(i.boundingBox)),Cr.applyMatrix4(t.matrixWorld),this.union(Cr)}let n=t.children;for(let r=0,o=n.length;r<o;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mi),mi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Cs),Rr.subVectors(this.max,Cs),Yn.subVectors(t.a,Cs),Zn.subVectors(t.b,Cs),Jn.subVectors(t.c,Cs),nn.subVectors(Zn,Yn),sn.subVectors(Jn,Zn),Tn.subVectors(Yn,Jn);let e=[0,-nn.z,nn.y,0,-sn.z,sn.y,0,-Tn.z,Tn.y,nn.z,0,-nn.x,sn.z,0,-sn.x,Tn.z,0,-Tn.x,-nn.y,nn.x,0,-sn.y,sn.x,0,-Tn.y,Tn.x,0];return!fl(e,Yn,Zn,Jn,Rr)||(e=[1,0,0,0,1,0,0,0,1],!fl(e,Yn,Zn,Jn,Rr))?!1:(Ir.crossVectors(nn,sn),e=[Ir.x,Ir.y,Ir.z],fl(e,Yn,Zn,Jn,Rr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ki),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ki=[new k,new k,new k,new k,new k,new k,new k,new k],mi=new k,Cr=new Wi,Yn=new k,Zn=new k,Jn=new k,nn=new k,sn=new k,Tn=new k,Cs=new k,Rr=new k,Ir=new k,En=new k;function fl(s,t,e,i,n){for(let r=0,o=s.length-3;r<=o;r+=3){En.fromArray(s,r);let a=n.x*Math.abs(En.x)+n.y*Math.abs(En.y)+n.z*Math.abs(En.z),l=t.dot(En),c=e.dot(En),h=i.dot(En);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var ve=new k,Pr=new Ft,Ed=0,qe=class extends Ri{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ed++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=uc,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Pr.fromBufferAttribute(this,e),Pr.applyMatrix3(t),this.setXY(e,Pr.x,Pr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ei(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ie(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ei(e,this.array)),e}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ei(e,this.array)),e}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ei(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ei(e,this.array)),e}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array),r=ie(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Ws=class extends qe{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Xs=class extends qe{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ye=class extends qe{constructor(t,e,i){super(new Float32Array(t),e,i)}},Ad=new Wi,Rs=new k,dl=new k,Xi=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Ad.setFromPoints(t).getCenter(i);let n=0;for(let r=0,o=t.length;r<o;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);let e=Rs.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(Rs,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rs.copy(t.center).add(dl)),this.expandByPoint(Rs.copy(t.center).sub(dl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Cd=0,ai=new kt,pl=new ze,$n=new k,Qe=new Wi,Is=new Wi,Ae=new k,Ve=class s extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(dd(t)?Xs:Ws)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Lt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return ai.makeRotationFromQuaternion(t),this.applyMatrix4(ai),this}rotateX(t){return ai.makeRotationX(t),this.applyMatrix4(ai),this}rotateY(t){return ai.makeRotationY(t),this.applyMatrix4(ai),this}rotateZ(t){return ai.makeRotationZ(t),this.applyMatrix4(ai),this}translate(t,e,i){return ai.makeTranslation(t,e,i),this.applyMatrix4(ai),this}scale(t,e,i){return ai.makeScale(t,e,i),this.applyMatrix4(ai),this}lookAt(t){return pl.lookAt(t),pl.updateMatrix(),this.applyMatrix4(pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($n).negate(),this.translate($n.x,$n.y,$n.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let o=t[n];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ye(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let i=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Is.setFromBufferAttribute(a),this.morphTargetsRelative?(Ae.addVectors(Qe.min,Is.min),Qe.expandByPoint(Ae),Ae.addVectors(Qe.max,Is.max),Qe.expandByPoint(Ae)):(Qe.expandByPoint(Is.min),Qe.expandByPoint(Is.max))}Qe.getCenter(i);let n=0;for(let r=0,o=t.count;r<o;r++)Ae.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Ae));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ae.fromBufferAttribute(a,c),l&&($n.fromBufferAttribute(t,c),Ae.add($n)),n=Math.max(n,i.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new qe(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let v=0;v<i.count;v++)a[v]=new k,l[v]=new k;let c=new k,h=new k,f=new k,u=new Ft,d=new Ft,g=new Ft,_=new k,m=new k;function p(v,T,I){c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,T),f.fromBufferAttribute(i,I),u.fromBufferAttribute(r,v),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,I),h.sub(c),f.sub(c),d.sub(u),g.sub(u);let L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(L),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(L),a[v].add(_),a[T].add(_),a[I].add(_),l[v].add(m),l[T].add(m),l[I].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let v=0,T=S.length;v<T;++v){let I=S[v],L=I.start,F=I.count;for(let B=L,P=L+F;B<P;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let E=new k,y=new k,b=new k,w=new k;function R(v){b.fromBufferAttribute(n,v),w.copy(b);let T=a[v];E.copy(T),E.sub(b.multiplyScalar(b.dot(T))).normalize(),y.crossVectors(w,T);let L=y.dot(l[v])<0?-1:1;o.setXYZW(v,E.x,E.y,E.z,L)}for(let v=0,T=S.length;v<T;++v){let I=S[v],L=I.start,F=I.count;for(let B=L,P=L+F;B<P;B+=3)R(t.getX(B+0)),R(t.getX(B+1)),R(t.getX(B+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new qe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let n=new k,r=new k,o=new k,a=new k,l=new k,c=new k,h=new k,f=new k;if(t)for(let u=0,d=t.count;u<d;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),f.subVectors(n,r),h.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)n.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),f.subVectors(n,r),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,f=a.normalized,u=new c.constructor(l.length*h),d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[d++]}return new qe(u,h,f)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let a in n){let l=n[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},fo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=uc,this.updateRanges=[],this.version=0,this.uuid=Hi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,r=this.stride;n<r;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},Oe=new k,qs=class s{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Ei(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ie(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ei(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ei(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ei(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ei(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array),r=ie(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Vs("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return new qe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Vs("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ml=new k,Rd=new k,Id=new Lt,gi=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=ml.subVectors(i,e).cross(Rd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(ml),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Id.getNormalMatrix(t),n=this.coplanarPoint(ml).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Pd=0,qi=class extends Ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=Hi(),this.name="",this.type="Material",this.blending=fs,this.side=un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ql,this.blendDst=Yl,this.blendEquation=Pn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kr,this.stencilZFail=Kr,this.stencilZPass=Kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Rt(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Rt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=n(t.textures),o=n(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Wt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new gi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ft().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ft().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},po=class extends qi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Kn,Ps=new k,Qn=new k,jn=new k,ts=new Ft,Ls=new Ft,Lu=new kt,Lr=new k,Ds=new k,Dr=new k,Rh=new Ft,gl=new Ft,Ih=new Ft,Il=class extends ze{constructor(t=new po){if(super(),this.isSprite=!0,this.type="Sprite",Kn===void 0){Kn=new Ve;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new fo(e,5);Kn.setIndex([0,1,2,0,2,3]),Kn.setAttribute("position",new qs(i,3,0,!1)),Kn.setAttribute("uv",new qs(i,2,3,!1))}this.geometry=Kn,this.material=t,this.center=new Ft(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Pt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qn.setFromMatrixScale(this.matrixWorld),Lu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),jn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qn.multiplyScalar(-jn.z);let i=this.material.rotation,n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));let o=this.center;Nr(Lr.set(-.5,-.5,0),jn,o,Qn,n,r),Nr(Ds.set(.5,-.5,0),jn,o,Qn,n,r),Nr(Dr.set(.5,.5,0),jn,o,Qn,n,r),Rh.set(0,0),gl.set(1,0),Ih.set(1,1);let a=t.ray.intersectTriangle(Lr,Ds,Dr,!1,Ps);if(a===null&&(Nr(Ds.set(-.5,.5,0),jn,o,Qn,n,r),gl.set(0,1),a=t.ray.intersectTriangle(Lr,Dr,Ds,!1,Ps),a===null))return;let l=t.ray.origin.distanceTo(Ps);l<t.near||l>t.far||e.push({distance:l,point:Ps.clone(),uv:Vi.getInterpolation(Ps,Lr,Ds,Dr,Rh,gl,Ih,new Ft),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Nr(s,t,e,i,n,r){ts.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(Ls.x=r*ts.x-n*ts.y,Ls.y=n*ts.x+r*ts.y):Ls.copy(ts),s.copy(t),s.x+=Ls.x,s.y+=Ls.y,s.applyMatrix4(Lu)}var zi=new k,_l=new k,Ur=new k,Fr=new k,cs=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=zi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zi.copy(this.origin).addScaledVector(this.direction,e),zi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){_l.copy(t).add(e).multiplyScalar(.5),Ur.copy(e).sub(t).normalize(),Fr.copy(this.origin).sub(_l);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ur),a=Fr.dot(this.direction),l=-Fr.dot(Ur),c=Fr.lengthSq(),h=Math.abs(1-o*o),f,u,d,g;if(h>0)if(f=o*l-a,u=o*a-l,g=r*h,f>=0)if(u>=-g)if(u<=g){let _=1/h;f*=_,u*=_,d=f*(f+o*u+2*a)+u*(o*f+u+2*l)+c}else u=r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),n&&n.copy(_l).addScaledVector(Ur,u),d}intersectSphere(t,e){if(t.radius<0)return null;zi.subVectors(t.center,this.origin);let i=zi.dot(this.direction),n=zi.dot(zi)-i*i,r=t.radius*t.radius;if(n>r)return null;let o=Math.sqrt(r-n),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,n=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,n=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),i>o||r>n||((r>i||isNaN(i))&&(i=r),(o<n||isNaN(n))&&(n=o),f>=0?(a=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),i>l||a>n)||((a>i||i!==i)&&(i=a),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,zi)!==null}intersectTriangle(t,e,i,n,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,f=t.x-o.x,u=t.y-o.y,d=t.z-o.z,g=e.x-o.x,_=e.y-o.y,m=e.z-o.z,p=i.x-o.x,S=i.y-o.y,E=i.z-o.z,y=Math.abs(l),b=Math.abs(c),w=Math.abs(h),R,v,T,I,L,F,B,P,z,Y,q,it;if(y>=b&&y>=w?(T=l,F=f,z=g,it=p,l>=0?(R=c,v=h,I=u,L=d,B=_,P=m,Y=S,q=E):(R=h,v=c,I=d,L=u,B=m,P=_,Y=E,q=S)):b>=w?(T=c,F=u,z=_,it=S,c>=0?(R=h,v=l,I=d,L=f,B=m,P=g,Y=E,q=p):(R=l,v=h,I=f,L=d,B=g,P=m,Y=p,q=E)):(T=h,F=d,z=m,it=E,h>=0?(R=l,v=c,I=f,L=u,B=g,P=_,Y=p,q=S):(R=c,v=l,I=u,L=f,B=_,P=g,Y=S,q=p)),T===0)return null;let X=R/T,j=v/T,et=1/T,Ct=I-X*F,Et=L-j*F,oe=B-X*z,qt=P-j*z,Jt=Y-X*it,J=q-j*it,tt=Jt*qt-J*oe,vt=Ct*J-Et*Jt,Dt=oe*Et-qt*Ct;if(n){if(tt<0||vt<0||Dt<0)return null}else if((tt<0||vt<0||Dt<0)&&(tt>0||vt>0||Dt>0))return null;let _t=tt+vt+Dt;if(_t===0)return null;let Ot=et*(tt*F+vt*z+Dt*it);return(_t>0?Ot<0:Ot>0)?null:this.at(Ot/_t,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ys=class extends qi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ph=new kt,An=new cs,Br=new Xi,Lh=new k,Or=new k,kr=new k,zr=new k,xl=new k,Vr=new k,Dh=new k,Hr=new k,ti=class extends ze{constructor(t=new Ve,e=new Ys){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let a=this.morphTargetInfluences;if(r&&a){Vr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],f=r[l];h!==0&&(xl.fromBufferAttribute(f,t),o?Vr.addScaledVector(xl,h):Vr.addScaledVector(xl.sub(e),h))}e.add(Vr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere),Br.applyMatrix4(r),An.copy(t.ray).recast(t.near),!(Br.containsPoint(An.origin)===!1&&(An.intersectSphere(Br,Lh)===null||An.origin.distanceToSquared(Lh)>(t.far-t.near)**2))&&(Ph.copy(r).invert(),An.copy(t.ray).applyMatrix4(Ph),!(i.boundingBox!==null&&An.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,An)))}_computeIntersections(t,e,i){let n,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),E=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=S,b=E;y<b;y+=3){let w=a.getX(y),R=a.getX(y+1),v=a.getX(y+2);n=Gr(this,p,t,i,c,h,f,w,R,v),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let S=a.getX(m),E=a.getX(m+1),y=a.getX(m+2);n=Gr(this,o,t,i,c,h,f,S,E,y),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),E=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=S,b=E;y<b;y+=3){let w=y,R=y+1,v=y+2;n=Gr(this,p,t,i,c,h,f,w,R,v),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let S=m,E=m+1,y=m+2;n=Gr(this,o,t,i,c,h,f,S,E,y),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}};function Ld(s,t,e,i,n,r,o,a){let l;if(t.side===He?l=i.intersectTriangle(o,r,n,!0,a):l=i.intersectTriangle(n,r,o,t.side===un,a),l===null)return null;Hr.copy(a),Hr.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Hr);return c<e.near||c>e.far?null:{distance:c,point:Hr.clone(),object:s}}function Gr(s,t,e,i,n,r,o,a,l,c){s.getVertexPosition(a,Or),s.getVertexPosition(l,kr),s.getVertexPosition(c,zr);let h=Ld(s,t,e,i,Or,kr,zr,Dh);if(h){let f=new k;Vi.getBarycoord(Dh,Or,kr,zr,f),n&&(h.uv=Vi.getInterpolatedAttribute(n,a,l,c,f,new Ft)),r&&(h.uv1=Vi.getInterpolatedAttribute(r,a,l,c,f,new Ft)),o&&(h.normal=Vi.getInterpolatedAttribute(o,a,l,c,f,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new k,materialIndex:0};Vi.getNormal(Or,kr,zr,u.normal),h.face=u,h.barycoord=f}return h}var Ns=new ne,Nh=new ne,Uh=new ne,Dd=new ne,Fh=new kt,Wr=new k,vl=new Xi,Bh=new kt,yl=new cs,Pl=class extends ti{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=bl,this.bindMatrix=new kt,this.bindMatrixInverse=new kt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Wi),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,Wr),this.boundingBox.expandByPoint(Wr)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Xi),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,Wr),this.boundingSphere.expandByPoint(Wr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let i=this.material,n=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vl.copy(this.boundingSphere),vl.applyMatrix4(n),t.ray.intersectsSphere(vl)!==!1&&(Bh.copy(n).invert(),yl.copy(t.ray).applyMatrix4(Bh),!(this.boundingBox!==null&&yl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,yl)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new ne,e=this.geometry.attributes.skinWeight;for(let i=0,n=e.count;i<n;i++){t.fromBufferAttribute(e,i);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(i,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===bl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===gu?this.bindMatrixInverse.copy(this.bindMatrix).invert():Rt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let i=this.skeleton,n=this.geometry;Nh.fromBufferAttribute(n.attributes.skinIndex,t),Uh.fromBufferAttribute(n.attributes.skinWeight,t),e.isVector4?(Ns.copy(e),e.set(0,0,0,0)):(Ns.set(...e,1),e.set(0,0,0)),Ns.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Uh.getComponent(r);if(o!==0){let a=Nh.getComponent(r);Fh.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),e.addScaledVector(Dd.copy(Ns).applyMatrix4(Fh),o)}}return e.isVector4&&(e.w=Ns.w),e.applyMatrix4(this.bindMatrixInverse)}},mo=class extends ze{constructor(){super(),this.isBone=!0,this.type="Bone"}},Zs=class extends ke{constructor(t=null,e=1,i=1,n,r,o,a,l,c=Ce,h=Ce,f,u){super(null,o,a,l,c,h,n,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Oh=new kt,Nd=new kt,Ll=class s{constructor(t=[],e=[]){this.uuid=Hi(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Rt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new kt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let i=new kt;this.bones[t]&&i.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let i=this.bones[t];i&&i.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let i=this.bones[t];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let t=this.bones,e=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:Nd;Oh.multiplyMatrices(a,e[r]),Oh.toArray(i,r*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let i=new Zs(e,t,t,si,li);return i.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=i,this}getBoneByName(t){for(let e=0,i=this.bones.length;e<i;e++){let n=this.bones[e];if(n.name===t)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let i=0,n=t.bones.length;i<n;i++){let r=t.bones[i],o=e[r];o===void 0&&(Rt("Skeleton: No bone found with UUID:",r),o=new mo),this.bones.push(o),this.boneInverses.push(new kt().fromArray(t.boneInverses[i]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,i=this.boneInverses;for(let n=0,r=e.length;n<r;n++){let o=e[n];t.bones.push(o.uuid);let a=i[n];t.boneInverses.push(a.toArray())}return t}},Dl=class extends qe{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}};var Cn=new Xi,Ud=new Ft(.5,.5),Xr=new k,Js=class{constructor(t=new gi,e=new gi,i=new gi,n=new gi,r=new gi,o=new gi){this.planes=[t,e,i,n,r,o]}set(t,e,i,n,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(n),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=_i,i=!1){let n=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],S=r[12],E=r[13],y=r[14],b=r[15];if(n[0].setComponents(c-o,d-h,p-g,b-S).normalize(),n[1].setComponents(c+o,d+h,p+g,b+S).normalize(),n[2].setComponents(c+a,d+f,p+_,b+E).normalize(),n[3].setComponents(c-a,d-f,p-_,b-E).normalize(),i)n[4].setComponents(l,u,m,y).normalize(),n[5].setComponents(c-l,d-u,p-m,b-y).normalize();else if(n[4].setComponents(c-l,d-u,p-m,b-y).normalize(),e===_i)n[5].setComponents(c+l,d+u,p+m,b+y).normalize();else if(e===ks)n[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Cn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Cn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Cn)}intersectsSprite(t){Cn.center.set(0,0,0);let e=Ud.distanceTo(t.center);return Cn.radius=.7071067811865476+e,Cn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Cn)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(Xr.x=n.normal.x>0?t.max.x:t.min.x,Xr.y=n.normal.y>0?t.max.y:t.min.y,Xr.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var go=class extends qi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},_o=new k,xo=new k,kh=new kt,Us=new cs,qr=new Xi,Ml=new k,zh=new k,vo=class extends ze{constructor(t=new Ve,e=new go){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)_o.fromBufferAttribute(e,n-1),xo.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=_o.distanceTo(xo);t.setAttribute("lineDistance",new ye(i,1))}else Rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qr.copy(i.boundingSphere),qr.applyMatrix4(n),qr.radius+=r,t.ray.intersectsSphere(qr)===!1)return;kh.copy(n).invert(),Us.copy(t.ray).applyMatrix4(kh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){let p=h.getX(_),S=h.getX(_+1),E=Yr(this,t,Us,l,p,S,_);E&&e.push(E)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(d),p=Yr(this,t,Us,l,_,m,g-1);p&&e.push(p)}}else{let d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){let p=Yr(this,t,Us,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){let _=Yr(this,t,Us,l,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Yr(s,t,e,i,n,r,o){let a=s.geometry.attributes.position;if(_o.fromBufferAttribute(a,n),xo.fromBufferAttribute(a,r),e.distanceSqToSegment(_o,xo,Ml,zh)>i)return;Ml.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Ml);if(!(c<t.near||c>t.far))return{distance:c,point:zh.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var Vh=new k,Hh=new k,Nl=class extends vo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let n=0,r=e.count;n<r;n+=2)Vh.fromBufferAttribute(e,n),Hh.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Vh.distanceTo(Hh);t.setAttribute("lineDistance",new ye(i,1))}else Rt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var $s=class extends ke{constructor(t=[],e=fn,i,n,r,o,a,l,c,h){super(t,e,i,n,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ul=class extends ke{constructor(t,e,i,n,r,o,a,l,c){super(t,e,i,n,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var an=class extends ke{constructor(t,e,i=vi,n,r,o,a=Ce,l=Ce,c,h=Ci,f=1){if(h!==Ci&&h!==pn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,n,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new as(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},yo=class extends an{constructor(t,e=vi,i=fn,n,r,o=Ce,a=Ce,l,c=Ci){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,i,n,r,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ks=class extends ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},hs=class s extends Ve{constructor(t=1,e=1,i=1,n=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:o};let a=this;n=Math.floor(n),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],f=[],u=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,n,o,2),g("x","z","y",1,-1,t,i,-e,n,o,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new ye(c,3)),this.setAttribute("normal",new ye(h,3)),this.setAttribute("uv",new ye(f,2));function g(_,m,p,S,E,y,b,w,R,v,T){let I=y/R,L=b/v,F=y/2,B=b/2,P=w/2,z=R+1,Y=v+1,q=0,it=0,X=new k;for(let j=0;j<Y;j++){let et=j*L-B;for(let Ct=0;Ct<z;Ct++){let Et=Ct*I-F;X[_]=Et*S,X[m]=et*E,X[p]=P,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[p]=w>0?1:-1,h.push(X.x,X.y,X.z),f.push(Ct/R),f.push(1-j/v),q+=1}}for(let j=0;j<v;j++)for(let et=0;et<R;et++){let Ct=u+et+z*j,Et=u+et+z*(j+1),oe=u+(et+1)+z*(j+1),qt=u+(et+1)+z*j;l.push(Ct,Et,qt),l.push(Et,oe,qt),it+=6}a.addGroup(d,it,T),d+=it,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Fl=class s extends Ve{constructor(t=1,e=1,i=1,n=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],f=[],u=[],d=[],g=0,_=[],m=i/2,p=0;S(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new ye(f,3)),this.setAttribute("normal",new ye(u,3)),this.setAttribute("uv",new ye(d,2));function S(){let y=new k,b=new k,w=0,R=(e-t)/i;for(let v=0;v<=r;v++){let T=[],I=v/r,L=I*(e-t)+t;for(let F=0;F<=n;F++){let B=F/n,P=B*l+a,z=Math.sin(P),Y=Math.cos(P);b.x=L*z,b.y=-I*i+m,b.z=L*Y,f.push(b.x,b.y,b.z),y.set(z,R,Y).normalize(),u.push(y.x,y.y,y.z),d.push(B,1-I),T.push(g++)}_.push(T)}for(let v=0;v<n;v++)for(let T=0;T<r;T++){let I=_[T][v],L=_[T+1][v],F=_[T+1][v+1],B=_[T][v+1];(t>0||T!==0)&&(h.push(I,L,B),w+=3),(e>0||T!==r-1)&&(h.push(L,F,B),w+=3)}c.addGroup(p,w,0),p+=w}function E(y){let b=g,w=new Ft,R=new k,v=0,T=y===!0?t:e,I=y===!0?1:-1;for(let F=1;F<=n;F++)f.push(0,m*I,0),u.push(0,I,0),d.push(.5,.5),g++;let L=g;for(let F=0;F<=n;F++){let P=F/n*l+a,z=Math.cos(P),Y=Math.sin(P);R.x=T*Y,R.y=m*I,R.z=T*z,f.push(R.x,R.y,R.z),u.push(0,I,0),w.x=z*.5+.5,w.y=Y*.5*I+.5,d.push(w.x,w.y),g++}for(let F=0;F<n;F++){let B=b+F,P=L+F;y===!0?h.push(P,P+1,B):h.push(P+1,P,B),v+=3}c.addGroup(p,v,y===!0?1:2),p+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Qs=class s extends Ve{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(n),c=a+1,h=l+1,f=t/a,u=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let S=p*u-o;for(let E=0;E<c;E++){let y=E*f-r;g.push(y,-S,0),_.push(0,0,1),m.push(E/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){let E=S+c*p,y=S+c*(p+1),b=S+1+c*(p+1),w=S+1+c*p;d.push(E,y,w),d.push(y,b,w)}this.setIndex(d),this.setAttribute("position",new ye(g,3)),this.setAttribute("normal",new ye(_,3)),this.setAttribute("uv",new ye(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var Bl=class s extends Ve{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],f=new k,u=new k,d=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){let S=[],E=p/i,y=o+E*a,b=t*Math.cos(y),w=Math.sqrt(t*t-b*b),R=0;p===0&&o===0?R=.5/e:p===i&&l===Math.PI&&(R=-.5/e);for(let v=0;v<=e;v++){let T=v/e,I=n+T*r;f.x=-w*Math.cos(I),f.y=b,f.z=w*Math.sin(I),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(T+R,1-E),S.push(c++)}h.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){let E=h[p][S+1],y=h[p][S],b=h[p+1][S],w=h[p+1][S+1];(p!==0||o>0)&&d.push(E,y,w),(p!==i-1||l<Math.PI)&&d.push(y,b,w)}this.setIndex(d),this.setAttribute("position",new ye(g,3)),this.setAttribute("normal",new ye(_,3)),this.setAttribute("uv",new ye(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Dn(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(Gh(n))n.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Gh(n[0])){let r=[];for(let o=0,a=n.length;o<a;o++)r[o]=n[o].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function Fe(s){let t={};for(let e=0;e<s.length;e++){let i=Dn(s[e]);for(let n in i)t[n]=i[n]}return t}function Gh(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Fd(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function dc(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Gt.workingColorSpace}var Du={clone:Dn,merge:Fe},Bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ei=class extends qi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bd,this.fragmentShader=Od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Dn(t.uniforms),this.uniformsGroups=Fd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let o=this.uniforms[n].value;o&&o.isTexture?e.uniforms[n]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[n]={type:"m4",value:o.toArray()}:e.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new Wt().setHex(n.value);break;case"v2":this.uniforms[i].value=new Ft().fromArray(n.value);break;case"v3":this.uniforms[i].value=new k().fromArray(n.value);break;case"v4":this.uniforms[i].value=new ne().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Lt().fromArray(n.value);break;case"m4":this.uniforms[i].value=new kt().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Mo=class extends ei{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var So=class extends qi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},bo=class extends qi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function es(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Sl(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var ln=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];i:{t:{let o;e:{n:if(!(t<n)){for(let a=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=n,n=e[++i],t<n)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break i}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let o=0;o!==n;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},wo=class extends ln{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tl,endingEnd:Tl}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,o=t+1,a=n[r],l=n[o];if(a===void 0)switch(this.getSettings_().endingStart){case El:r=t,a=2*e-i;break;case Al:r=n.length-2,a=e+n[r]-n[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case El:o=t,l=2*i-e;break;case Al:o=1,l=i+n[1]-n[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,g=(i-e)/(n-e),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,S=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,E=(-1-d)*m+(1.5+d)*_+.5*g,y=d*m-d*_;for(let b=0;b!==a;++b)r[b]=p*o[h+b]+S*o[c+b]+E*o[l+b]+y*o[f+b];return r}},To=class extends ln{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(n-e),f=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*f+o[l+u]*h;return r}},Eo=class extends ln{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},Ao=class extends ln{interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,f=this.outTangents;if(!h||!f){let g=(i-e)/(n-e),_=1-g;for(let m=0;m!==a;++m)r[m]=o[c+m]*_+o[l+m]*g;return r}let u=a*2,d=t-1;for(let g=0;g!==a;++g){let _=o[c+g],m=o[l+g],p=d*u+g*2,S=f[p],E=f[p+1],y=t*u+g*2,b=h[y],w=h[y+1],R=zd(i,e,S,b,n);r[g]=Nu(R,_,E,w,m)}return r}};function Nu(s,t,e,i,n){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*i+s*s*s*n}function kd(s,t,e,i,n){let r=1-s;return 3*r*r*(e-t)+6*r*s*(i-e)+3*s*s*(n-i)}function zd(s,t,e,i,n){let r=(s-t)/(n-t);for(let o=0;o<8;o++){let a=Nu(r,t,e,i,n)-s;if(Math.abs(a)<1e-10)break;let l=kd(r,t,e,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var ii=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=es(e,this.TimeBufferType),this.values=es(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:es(t.times,Array),values:es(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),Sl(t.settings)&&(i.settings={inTangents:es(t.settings.inTangents,Array),outTangents:es(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Eo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new To(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new wo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ao(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Fs:e=this.InterpolantFactoryMethodDiscrete;break;case ao:e=this.InterpolantFactoryMethodLinear;break;case $r:e=this.InterpolantFactoryMethodSmooth;break;case wl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Rt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fs;case this.InterpolantFactoryMethodLinear:return ao;case this.InterpolantFactoryMethodSmooth:return $r;case this.InterpolantFactoryMethodBezier:return wl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;Sl(this.settings)&&(Wh(this.settings.inTangents,t),Wh(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,r=0,o=n-1;for(;r!==n&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==n){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Pt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Pt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){Pt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Pt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(n!==void 0&&pd(n))for(let a=0,l=n.length;a!==l;++a){let c=n[a];if(isNaN(c)){Pt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===$r,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(n)l=!0;else{let f=a*i,u=f-i,d=f+i;for(let g=0;g!==i;++g){let _=e[f+g];if(_!==e[u+g]||_!==e[d+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let f=a*i,u=o*i;for(let d=0;d!==i;++d)e[u+d]=e[f+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,Sl(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Wh(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]*=t}ii.prototype.ValueTypeName="";ii.prototype.TimeBufferType=Float32Array;ii.prototype.ValueBufferType=Float32Array;ii.prototype.DefaultInterpolation=ao;var cn=class extends ii{constructor(t,e,i){super(t,e,i)}};cn.prototype.ValueTypeName="bool";cn.prototype.ValueBufferType=Array;cn.prototype.DefaultInterpolation=Fs;cn.prototype.InterpolantFactoryMethodLinear=void 0;cn.prototype.InterpolantFactoryMethodSmooth=void 0;var Co=class extends ii{constructor(t,e,i,n){super(t,e,i,n)}};Co.prototype.ValueTypeName="color";var Ro=class extends ii{constructor(t,e,i,n){super(t,e,i,n)}};Ro.prototype.ValueTypeName="number";var Io=class extends ln{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(n-e),c=t*a;for(let h=c+a;c!==h;c+=4)Ii.slerpFlat(r,0,o,c-a,o,c,l);return r}},js=class extends ii{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new Io(this.times,this.values,this.getValueSize(),t)}};js.prototype.ValueTypeName="quaternion";js.prototype.InterpolantFactoryMethodSmooth=void 0;var hn=class extends ii{constructor(t,e,i){super(t,e,i)}};hn.prototype.ValueTypeName="string";hn.prototype.ValueBufferType=Array;hn.prototype.DefaultInterpolation=Fs;hn.prototype.InterpolantFactoryMethodLinear=void 0;hn.prototype.InterpolantFactoryMethodSmooth=void 0;var Po=class extends ii{constructor(t,e,i,n){super(t,e,i,n)}};Po.prototype.ValueTypeName="vector";var Lo=class{constructor(t,e,i){let n=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,r===!1&&n.onStart!==void 0&&n.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,n.onProgress!==void 0&&n.onProgress(h,o,a),o===a&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Uu=new Lo,Do=class{constructor(t){this.manager=t!==void 0?t:Uu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Do.DEFAULT_MATERIAL_NAME="__DEFAULT";var Zr=new k,Jr=new Ii,Ti=new k,tr=class extends ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=_i,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Zr,Jr,Ti),Ti.x===1&&Ti.y===1&&Ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Jr,Ti.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Zr,Jr,Ti),Ti.x===1&&Ti.y===1&&Ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Jr,Ti.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},rn=new k,Xh=new Ft,qh=new Ft,Xe=class extends tr{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=lo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ka*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return lo*2*Math.atan(Math.tan(Ka*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(rn.x,rn.y).multiplyScalar(-t/rn.z),rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rn.x,rn.y).multiplyScalar(-t/rn.z)}getViewSize(t,e){return this.getViewBounds(t,Xh,qh),e.subVectors(qh,Xh)}setViewOffset(t,e,i,n,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ka*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*n/l,e-=o.offsetY*i/c,n*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var er=class extends tr{constructor(t=-1,e=1,i=1,n=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,o=i+t,a=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Ol=class extends Ve{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var is=-90,ns=1,No=class extends ze{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new Xe(is,ns,t,e);n.layers=this.layers,this.add(n);let r=new Xe(is,ns,t,e);r.layers=this.layers,this.add(r);let o=new Xe(is,ns,t,e);o.layers=this.layers,this.add(o);let a=new Xe(is,ns,t,e);a.layers=this.layers,this.add(a);let l=new Xe(is,ns,t,e);l.layers=this.layers,this.add(l);let c=new Xe(is,ns,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===_i)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ks)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Uo=class extends Xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var pc="\\[\\]\\.:\\/",Vd=new RegExp("["+pc+"]","g"),mc="[^"+pc+"]",Hd="[^"+pc.replace("\\.","")+"]",Gd=/((?:WC+[\/:])*)/.source.replace("WC",mc),Wd=/(WCOD+)?/.source.replace("WCOD",Hd),Xd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mc),qd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mc),Yd=new RegExp("^"+Gd+Wd+Xd+qd+"$"),Zd=["material","materials","bones","map"],kl=class{constructor(t,e,i){let n=i||ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},ue=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Vd,"")}static parseTrackName(t){let e=Yd.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);Zd.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Pt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Pt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Pt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Pt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Pt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[n];if(o===void 0){let c=e.nodeName;Pt("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ue.Composite=kl;ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ue.prototype.GetterByBindingType=[ue.prototype._getValue_direct,ue.prototype._getValue_array,ue.prototype._getValue_arrayElement,ue.prototype._getValue_toArray];ue.prototype.SetterByBindingTypeAndVersioning=[[ue.prototype._setValue_direct,ue.prototype._setValue_direct_setNeedsUpdate,ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_array,ue.prototype._setValue_array_setNeedsUpdate,ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_arrayElement,ue.prototype._setValue_arrayElement_setNeedsUpdate,ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_fromArray,ue.prototype._setValue_fromArray_setNeedsUpdate,ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Yx=new Float32Array(1);var zl=class{constructor(t,e,i,n,r,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=i,this.elementSize=n,this.count=r,this.normalized=o,this.version=0}set needsUpdate(t){t===!0&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}};var Vl=class s{static{s.prototype.isMatrix2=!0}constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};function gc(s,t,e,i){let n=Jd(i);switch(e){case ac:return s*t;case cc:return s*t/n.components*n.byteLength;case Ho:return s*t/n.components*n.byteLength;case mn:return s*t*2/n.components*n.byteLength;case Go:return s*t*2/n.components*n.byteLength;case lc:return s*t*3/n.components*n.byteLength;case si:return s*t*4/n.components*n.byteLength;case Wo:return s*t*4/n.components*n.byteLength;case rr:case or:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ar:case lr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case qo:case Zo:return Math.max(s,16)*Math.max(t,8)/4;case Xo:case Yo:return Math.max(s,8)*Math.max(t,8)/2;case Jo:case $o:case Qo:case jo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ko:case cr:case ta:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ea:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ia:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case na:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case sa:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case ra:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case oa:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case aa:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case la:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ca:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ha:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case ua:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case fa:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case da:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case pa:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case ma:case ga:case _a:return Math.ceil(s/4)*Math.ceil(t/4)*16;case xa:case va:return Math.ceil(s/4)*Math.ceil(t/4)*8;case hr:case ya:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jd(s){switch(s){case ni:case nc:return{byteLength:1,components:1};case ds:case sc:case yi:return{byteLength:2,components:1};case zo:case Vo:return{byteLength:2,components:4};case vi:case ko:case li:return{byteLength:4,components:1};case rc:case oc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function rf(){let s=null,t=!1,e=null,i=null;function n(r,o){i=s.requestAnimationFrame(n),e(r,o)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Kd(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,f=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){let h=l.array,f=l.updateRanges;if(s.bindBuffer(c,a),f.length===0)s.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){let g=f[u],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){let _=f[d];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:n,remove:r,update:o}}var Qd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,tp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ep=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ip=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,np=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,rp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,op=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,ap=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,up=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,fp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,vp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Mp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Sp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,bp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ap=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ip=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Dp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Up=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Op=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Wp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Xp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$p=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,jp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,em=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,om=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,am=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,um=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_m=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Mm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Em=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Am=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Cm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Im=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Om=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,km=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Hm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ym=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Km=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Qm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ng=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,rg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,og=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ag=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ug=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,dg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_g=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,vg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ag=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ig=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bt={alphahash_fragment:Qd,alphahash_pars_fragment:jd,alphamap_fragment:tp,alphamap_pars_fragment:ep,alphatest_fragment:ip,alphatest_pars_fragment:np,aomap_fragment:sp,aomap_pars_fragment:rp,batching_pars_vertex:op,batching_vertex:ap,begin_vertex:lp,beginnormal_vertex:cp,bsdfs:hp,iridescence_fragment:up,bumpmap_pars_fragment:fp,clipping_planes_fragment:dp,clipping_planes_pars_fragment:pp,clipping_planes_pars_vertex:mp,clipping_planes_vertex:gp,color_fragment:_p,color_pars_fragment:xp,color_pars_vertex:vp,color_vertex:yp,common:Mp,cube_uv_reflection_fragment:Sp,defaultnormal_vertex:bp,displacementmap_pars_vertex:wp,displacementmap_vertex:Tp,emissivemap_fragment:Ep,emissivemap_pars_fragment:Ap,colorspace_fragment:Cp,colorspace_pars_fragment:Rp,envmap_fragment:Ip,envmap_common_pars_fragment:Pp,envmap_pars_fragment:Lp,envmap_pars_vertex:Dp,envmap_physical_pars_fragment:Wp,envmap_vertex:Np,fog_vertex:Up,fog_pars_vertex:Fp,fog_fragment:Bp,fog_pars_fragment:Op,gradientmap_pars_fragment:kp,lightmap_pars_fragment:zp,lights_lambert_fragment:Vp,lights_lambert_pars_fragment:Hp,lights_pars_begin:Gp,lights_toon_fragment:Xp,lights_toon_pars_fragment:qp,lights_phong_fragment:Yp,lights_phong_pars_fragment:Zp,lights_physical_fragment:Jp,lights_physical_pars_fragment:$p,lights_fragment_begin:Kp,lights_fragment_maps:Qp,lights_fragment_end:jp,lightprobes_pars_fragment:tm,logdepthbuf_fragment:em,logdepthbuf_pars_fragment:im,logdepthbuf_pars_vertex:nm,logdepthbuf_vertex:sm,map_fragment:rm,map_pars_fragment:om,map_particle_fragment:am,map_particle_pars_fragment:lm,metalnessmap_fragment:cm,metalnessmap_pars_fragment:hm,morphinstance_vertex:um,morphcolor_vertex:fm,morphnormal_vertex:dm,morphtarget_pars_vertex:pm,morphtarget_vertex:mm,normal_fragment_begin:gm,normal_fragment_maps:_m,normal_pars_fragment:xm,normal_pars_vertex:vm,normal_vertex:ym,normalmap_pars_fragment:Mm,clearcoat_normal_fragment_begin:Sm,clearcoat_normal_fragment_maps:bm,clearcoat_pars_fragment:wm,iridescence_pars_fragment:Tm,opaque_fragment:Em,packing:Am,premultiplied_alpha_fragment:Cm,project_vertex:Rm,dithering_fragment:Im,dithering_pars_fragment:Pm,roughnessmap_fragment:Lm,roughnessmap_pars_fragment:Dm,shadowmap_pars_fragment:Nm,shadowmap_pars_vertex:Um,shadowmap_vertex:Fm,shadowmask_pars_fragment:Bm,skinbase_vertex:Om,skinning_pars_vertex:km,skinning_vertex:zm,skinnormal_vertex:Vm,specularmap_fragment:Hm,specularmap_pars_fragment:Gm,tonemapping_fragment:Wm,tonemapping_pars_fragment:Xm,transmission_fragment:qm,transmission_pars_fragment:Ym,uv_pars_fragment:Zm,uv_pars_vertex:Jm,uv_vertex:$m,worldpos_vertex:Km,background_vert:Qm,background_frag:jm,backgroundCube_vert:tg,backgroundCube_frag:eg,cube_vert:ig,cube_frag:ng,depth_vert:sg,depth_frag:rg,distance_vert:og,distance_frag:ag,equirect_vert:lg,equirect_frag:cg,linedashed_vert:hg,linedashed_frag:ug,meshbasic_vert:fg,meshbasic_frag:dg,meshlambert_vert:pg,meshlambert_frag:mg,meshmatcap_vert:gg,meshmatcap_frag:_g,meshnormal_vert:xg,meshnormal_frag:vg,meshphong_vert:yg,meshphong_frag:Mg,meshphysical_vert:Sg,meshphysical_frag:bg,meshtoon_vert:wg,meshtoon_frag:Tg,points_vert:Eg,points_frag:Ag,shadow_vert:Cg,shadow_frag:Rg,sprite_vert:Ig,sprite_frag:Pg},ut={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Ni={basic:{uniforms:Fe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Fe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Wt(0)},envMapIntensity:{value:1}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Fe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Fe([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Fe([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Fe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Fe([ut.points,ut.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Fe([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Fe([ut.common,ut.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Fe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Fe([ut.sprite,ut.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distance:{uniforms:Fe([ut.common,ut.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distance_vert,fragmentShader:Bt.distance_frag},shadow:{uniforms:Fe([ut.lights,ut.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};Ni.physical={uniforms:Fe([Ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};var ba={r:0,b:0,g:0},Lg=new kt,of=new Lt;of.set(-1,0,0,0,1,0,0,0,1);function Dg(s,t,e,i,n,r){let o=new Wt(0),a=n===!0?0:1,l,c,h=null,f=0,u=null;function d(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){let y=S.backgroundBlurriness>0;E=t.get(E,y)}return E}function g(S){let E=!1,y=d(S);y===null?m(o,a):y&&y.isColor&&(m(y,1),E=!0);let b=s.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(S,E){let y=d(E);y&&(y.isCubeTexture||y.mapping===nr)?(c===void 0&&(c=new ti(new hs(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:Dn(Ni.backgroundCube.uniforms),vertexShader:Ni.backgroundCube.vertexShader,fragmentShader:Ni.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Lg.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(of),c.material.toneMapped=Gt.getTransfer(y.colorSpace)!==Qt,(h!==y||f!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ti(new Qs(2,2),new ei({name:"BackgroundMaterial",uniforms:Dn(Ni.background.uniforms),vertexShader:Ni.background.vertexShader,fragmentShader:Ni.background.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Gt.getTransfer(y.colorSpace)!==Qt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,E){S.getRGB(ba,dc(s)),e.buffers.color.setClear(ba.r,ba.g,ba.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,E=1){o.set(S),a=E,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,m(o,a)},render:g,addToRenderList:_,dispose:p}}function Ng(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null),r=n,o=!1;function a(L,F,B,P,z){let Y=!1,q=f(L,P,B,F);r!==q&&(r=q,c(r.object)),Y=d(L,P,B,z),Y&&g(L,P,B,z),z!==null&&t.update(z,s.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,y(L,F,B,P),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return s.createVertexArray()}function c(L){return s.bindVertexArray(L)}function h(L){return s.deleteVertexArray(L)}function f(L,F,B,P){let z=P.wireframe===!0,Y=i[F.id];Y===void 0&&(Y={},i[F.id]=Y);let q=L.isInstancedMesh===!0?L.id:0,it=Y[q];it===void 0&&(it={},Y[q]=it);let X=it[B.id];X===void 0&&(X={},it[B.id]=X);let j=X[z];return j===void 0&&(j=u(l()),X[z]=j),j}function u(L){let F=[],B=[],P=[];for(let z=0;z<e;z++)F[z]=0,B[z]=0,P[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:B,attributeDivisors:P,object:L,attributes:{},index:null}}function d(L,F,B,P){let z=r.attributes,Y=F.attributes,q=0,it=B.getAttributes();for(let X in it)if(it[X].location>=0){let et=z[X],Ct=Y[X];if(Ct===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(Ct=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(Ct=L.instanceColor)),et===void 0||et.attribute!==Ct||Ct&&et.data!==Ct.data)return!0;q++}return r.attributesNum!==q||r.index!==P}function g(L,F,B,P){let z={},Y=F.attributes,q=0,it=B.getAttributes();for(let X in it)if(it[X].location>=0){let et=Y[X];et===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(et=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(et=L.instanceColor));let Ct={};Ct.attribute=et,et&&et.data&&(Ct.data=et.data),z[X]=Ct,q++}r.attributes=z,r.attributesNum=q,r.index=P}function _(){let L=r.newAttributes;for(let F=0,B=L.length;F<B;F++)L[F]=0}function m(L){p(L,0)}function p(L,F){let B=r.newAttributes,P=r.enabledAttributes,z=r.attributeDivisors;B[L]=1,P[L]===0&&(s.enableVertexAttribArray(L),P[L]=1),z[L]!==F&&(s.vertexAttribDivisor(L,F),z[L]=F)}function S(){let L=r.newAttributes,F=r.enabledAttributes;for(let B=0,P=F.length;B<P;B++)F[B]!==L[B]&&(s.disableVertexAttribArray(B),F[B]=0)}function E(L,F,B,P,z,Y,q){q===!0?s.vertexAttribIPointer(L,F,B,z,Y):s.vertexAttribPointer(L,F,B,P,z,Y)}function y(L,F,B,P){_();let z=P.attributes,Y=B.getAttributes(),q=F.defaultAttributeValues;for(let it in Y){let X=Y[it];if(X.location>=0){let j=z[it];if(j===void 0&&(it==="instanceMatrix"&&L.instanceMatrix&&(j=L.instanceMatrix),it==="instanceColor"&&L.instanceColor&&(j=L.instanceColor)),j!==void 0){let et=j.normalized,Ct=j.itemSize,Et=t.get(j);if(Et===void 0)continue;let oe=Et.buffer,qt=Et.type,Jt=Et.bytesPerElement,J=qt===s.INT||qt===s.UNSIGNED_INT||j.gpuType===ko;if(j.isInterleavedBufferAttribute){let tt=j.data,vt=tt.stride,Dt=j.offset;if(tt.isInstancedInterleavedBuffer){for(let _t=0;_t<X.locationSize;_t++)p(X.location+_t,tt.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let _t=0;_t<X.locationSize;_t++)m(X.location+_t);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let _t=0;_t<X.locationSize;_t++)E(X.location+_t,Ct/X.locationSize,qt,et,vt*Jt,(Dt+Ct/X.locationSize*_t)*Jt,J)}else{if(j.isInstancedBufferAttribute){for(let tt=0;tt<X.locationSize;tt++)p(X.location+tt,j.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let tt=0;tt<X.locationSize;tt++)m(X.location+tt);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let tt=0;tt<X.locationSize;tt++)E(X.location+tt,Ct/X.locationSize,qt,et,Ct*Jt,Ct/X.locationSize*tt*Jt,J)}}else if(q!==void 0){let et=q[it];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(X.location,et);break;case 3:s.vertexAttrib3fv(X.location,et);break;case 4:s.vertexAttrib4fv(X.location,et);break;default:s.vertexAttrib1fv(X.location,et)}}}}S()}function b(){T();for(let L in i){let F=i[L];for(let B in F){let P=F[B];for(let z in P){let Y=P[z];for(let q in Y)h(Y[q].object),delete Y[q];delete P[z]}}delete i[L]}}function w(L){if(i[L.id]===void 0)return;let F=i[L.id];for(let B in F){let P=F[B];for(let z in P){let Y=P[z];for(let q in Y)h(Y[q].object),delete Y[q];delete P[z]}}delete i[L.id]}function R(L){for(let F in i){let B=i[F];for(let P in B){let z=B[P];if(z[L.id]===void 0)continue;let Y=z[L.id];for(let q in Y)h(Y[q].object),delete Y[q];delete z[L.id]}}}function v(L){for(let F in i){let B=i[F],P=L.isInstancedMesh===!0?L.id:0,z=B[P];if(z!==void 0){for(let Y in z){let q=z[Y];for(let it in q)h(q[it].object),delete q[it];delete z[Y]}delete B[P],Object.keys(B).length===0&&delete i[F]}}}function T(){I(),o=!0,r!==n&&(r=n,c(r.object))}function I(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:a,reset:T,resetDefaultState:I,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Ug(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,i,1)}this.setMode=n,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Fg(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(R){return!(R!==si&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let v=R===yi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==ni&&R!==li&&!v&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Rt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=s.getParameter(s.MAX_SAMPLES),w=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:y,maxSamples:b,samples:w}}function Bg(s){let t=this,e=null,i=0,n=!1,r=!1,o=new gi,a=new Lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||i!==0||n;return n=u,i=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=s.get(f);if(!n||g===null||g.length===0||r&&!m)r?h(null):c();else{let S=r?0:i,E=S*4,y=p.clippingState||null;l.value=y,y=h(g,u,E,d);for(let b=0;b!==E;++b)y[b]=e[b];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(f,u,d,g){let _=f!==null?f.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=d+_*4,S=u.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,y=d;E!==_;++E,y+=4)o.copy(f[E]).applyMatrix4(S,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var gs=4,Og=6,kg=20,zg=256,ur=new er,Fu=new Wt,_c=null,xc=0,vc=0,yc=!1,Vg=new k,Nn=new k,Ta=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:o=256,position:a=Vg}=r;_c=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ou(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(_c,xc,vc),this._renderer.xr.enabled=yc,t.scissorTest=!1,ms(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===fn||t.mapping===Ln?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_c=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Pe,minFilter:Pe,generateMipmaps:!1,type:yi,format:si,colorSpace:Bs,depthBuffer:!1},n=Bu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bu(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Hg(r)),this._blurMaterial=Wg(r,t,e),this._ggxMaterial=Gg(r,t,e)}return n}_compileMaterial(t){let e=new ti(new Ve,t);this._renderer.compile(e,ur)}_sceneToCubeUV(t,e,i,n,r){let l=new Xe(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Fu),f.toneMapping=xi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(n),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ti(new hs,new Ys({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,p=!1,S=t.background;S?S.isColor&&(m.color.copy(S),t.background=null,p=!0):(m.color.copy(Fu),p=!0);for(let E=0;E<6;E++){let y=E%3;y===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):y===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));let b=this._cubeSize;ms(n,y*b,E>2?b:0,b,b),f.setRenderTarget(n),p&&f.render(_,l),f.render(t,l)}f.toneMapping=d,f.autoClear=u,t.background=S}_textureToCubeUV(t,e){let i=this._renderer,n=t.mapping===fn||t.mapping===Ln;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ou());let r=n?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;ms(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,ur)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let n=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let l=o.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=c*1.25,d=f*u,{_lodMax:g}=this,_=this._sizeLods[i],m=3*_*(i>g-gs?i-g+gs:0),p=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,ms(r,m,p,3*_,2*_),n.setRenderTarget(r),n.render(a,ur),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,ms(t,m,p,3*_,2*_),n.setRenderTarget(t),n.render(a,ur)}_blur(t,e,i,n){let r=this._pingPongRenderTarget,o=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,o),this._blurPass(r,t,i,i,o)}_blurPass(t,e,i,n,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[n];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],f=3*h*(n>this._lodMax-gs?n-this._lodMax+gs:0),u=4*(this._cubeSize-h);ms(e,f,u,3*h,2*h),o.setRenderTarget(e),o.render(l,ur)}};function Hg(s){let t=[],e=[],i=s,n=s-gs+1+Og;for(let r=0;r<n;r++){let o=Math.pow(2,i);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,u=6,d=3,g=new Float32Array(d*u*f),_=new Float32Array(d*u*f);for(let p=0;p<f;p++){let S=p%3*2/3-1,E=p>2?0:-1,y=[S,E,0,S+2/3,E,0,S+2/3,E+1,0,S,E,0,S+2/3,E+1,0,S,E+1,0];g.set(y,d*u*p);for(let b=0;b<u;b++){let w=h[b*2]*2-1,R=h[b*2+1]*2-1;p===0?Nn.set(1,R,w):p===1?Nn.set(-w,1,-R):p===2?Nn.set(-w,R,1):p===3?Nn.set(-1,R,-w):p===4?Nn.set(-w,-1,R):Nn.set(w,R,-1),Nn.toArray(_,(p*u+b)*d)}}let m=new Ve;m.setAttribute("position",new qe(g,d)),m.setAttribute("outputDirection",new qe(_,d)),e.push(new ti(m,null)),i>gs&&i--}return{lodMeshes:e,sizeLods:t}}function Bu(s,t,e){let i=new Ye(s,t,e);return i.texture.mapping=nr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ms(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function Gg(s,t,e){return new ei({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Aa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Wg(s,t,e){return new ei({name:"SphericalGaussianBlur",defines:{SAMPLES:kg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Aa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Ou(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function ku(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Aa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ea=class extends Ye{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new $s(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new hs(5,5,5),r=new ei({name:"CubemapFromEquirect",uniforms:Dn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:He,blending:Li});r.uniforms.tEquirect.value=e;let o=new ti(n,r),a=e.minFilter;return e.minFilter===dn&&(e.minFilter=Pe),new No(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,n);t.setRenderTarget(r)}};function Xg(s){let t=new WeakMap,e=new WeakMap,i=null;function n(u,d=!1){return u==null?null:d?o(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Fo||d===Bo)if(t.has(u)){let g=t.get(u).texture;return a(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let _=new Ea(g.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let d=u.mapping,g=d===Fo||d===Bo,_=d===fn||d===Ln;if(g||_){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Ta(s)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let S=u.image;return g&&S&&S.height>0||_&&S&&l(S)?(i===null&&(i=new Ta(s)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,d){return d===Fo?u.mapping=fn:d===Bo&&(u.mapping=Ln),u}function l(u){let d=0,g=6;for(let _=0;_<g;_++)u[_]!==void 0&&d++;return d===g}function c(u){let d=u.target;d.removeEventListener("dispose",c);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:f}}function qg(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&In("WebGLRenderer: "+i+" extension not supported."),n}}}function Yg(s,t,e,i){let n={},r=new WeakMap;function o(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete n[u.id];let d=r.get(u);d&&(t.remove(d),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(f,u){return n[u.id]===!0||(u.addEventListener("dispose",o),n[u.id]=!0,e.memory.geometries++),u}function l(f){let u=f.attributes;for(let d in u)t.update(u[d],s.ARRAY_BUFFER)}function c(f){let u=[],d=f.index,g=f.attributes.position,_=0;if(g===void 0)return;if(d!==null){let S=d.array;_=d.version;for(let E=0,y=S.length;E<y;E+=3){let b=S[E+0],w=S[E+1],R=S[E+2];u.push(b,w,w,R,R,b)}}else{let S=g.array;_=g.version;for(let E=0,y=S.length/3-1;E<y;E+=3){let b=E+0,w=E+1,R=E+2;u.push(b,w,w,R,R,b)}}let m=new(g.count>=65535?Xs:Ws)(u,1);m.version=_;let p=r.get(f);p&&t.remove(p),r.set(f,m)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:h}}function Zg(s,t,e){let i;function n(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,u){s.drawElements(i,u,r,f*o),e.update(u,i,1)}function c(f,u,d){d!==0&&(s.drawElementsInstanced(i,u,r,f*o,d),e.update(u,i,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,d);let _=0;for(let m=0;m<d;m++)_+=u[m];e.update(_,i,1)}this.setMode=n,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Jg(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:Pt("WebGLInfo: Unknown draw mode:",o);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function $g(s,t,e){let i=new WeakMap,n=new ne;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0,u=i.get(a);if(u===void 0||u.count!==f){let T=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],E=0;d===!0&&(E=1),g===!0&&(E=2),_===!0&&(E=3);let y=a.attributes.position.count*E,b=1;y>t.maxTextureSize&&(b=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let w=new Float32Array(y*b*4*f),R=new Hs(w,y,b,f);R.type=li,R.needsUpdate=!0;let v=E*4;for(let I=0;I<f;I++){let L=m[I],F=p[I],B=S[I],P=y*b*4*I;for(let z=0;z<L.count;z++){let Y=z*v;d===!0&&(n.fromBufferAttribute(L,z),w[P+Y+0]=n.x,w[P+Y+1]=n.y,w[P+Y+2]=n.z,w[P+Y+3]=0),g===!0&&(n.fromBufferAttribute(F,z),w[P+Y+4]=n.x,w[P+Y+5]=n.y,w[P+Y+6]=n.z,w[P+Y+7]=0),_===!0&&(n.fromBufferAttribute(B,z),w[P+Y+8]=n.x,w[P+Y+9]=n.y,w[P+Y+10]=n.z,w[P+Y+11]=B.itemSize===4?n.w:1)}}u={count:f,texture:R,size:new Ft(y,b)},i.set(a,u),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Kg(s,t,e,i,n){let r=new WeakMap;function o(c){let h=n.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var Qg={[Jl]:"LINEAR_TONE_MAPPING",[$l]:"REINHARD_TONE_MAPPING",[Kl]:"CINEON_TONE_MAPPING",[Ql]:"ACES_FILMIC_TONE_MAPPING",[tc]:"AGX_TONE_MAPPING",[ec]:"NEUTRAL_TONE_MAPPING",[jl]:"CUSTOM_TONE_MAPPING"};function jg(s,t,e,i,n,r){let o=new Ye(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Ve;c.setAttribute("position",new ye([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ye([0,2,0,0,2,0],2));let h=new Mo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new ti(c,h),u=new er(-1,1,1,-1,0,1),d=null,g=null,_=!1,m,p=null,S=[],E=!1;this.setSize=function(y,b){o.setSize(y,b),a!==null&&a.setSize(y,b),l!==null&&l.setSize(y,b);for(let w=0;w<S.length;w++){let R=S[w];R.setSize&&R.setSize(y,b)}},this.setEffects=function(y){S=y,E=S.length>0&&S[0].isRenderPass===!0;let b=o.width,w=o.height;S.length>0&&a===null&&(a=new Ye(b,w,{type:yi,depthBuffer:!1,stencilBuffer:!1}),l=new Ye(b,w,{type:yi,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<S.length;R++){let v=S[R];v.setSize&&v.setSize(b,w)}},this.begin=function(y,b){if(_||y.toneMapping===xi&&S.length===0)return!1;if(p=b,b!==null){let w=b.width,R=b.height;(o.width!==w||o.height!==R)&&this.setSize(w,R)}return E===!1&&y.setRenderTarget(o),m=y.toneMapping,y.toneMapping=xi,!0},this.hasRenderPass=function(){return E},this.end=function(y,b){y.toneMapping=m,_=!0;let w=o,R=a;for(let v=0;v<S.length;v++){let T=S[v];T.enabled!==!1&&(T.render(y,R,w,b),T.needsSwap!==!1&&(w=R,R=R===a?l:a))}if(d!==y.outputColorSpace||g!==y.toneMapping){d=y.outputColorSpace,g=y.toneMapping,h.defines={},Gt.getTransfer(d)===Qt&&(h.defines.SRGB_TRANSFER="");let v=Qg[g];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(p),y.render(f,u),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var af=new ke,bc=new an(1,1),lf=new Hs,cf=new uo,hf=new $s,zu=[],Vu=[],Hu=new Float32Array(16),Gu=new Float32Array(9),Wu=new Float32Array(4);function xs(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=zu[n];if(r===void 0&&(r=new Float32Array(n),zu[n]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function we(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function Te(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Ca(s,t){let e=Vu[t];e===void 0&&(e=new Int32Array(t),Vu[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function t0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function e0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2fv(this.addr,t),Te(e,t)}}function i0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;s.uniform3fv(this.addr,t),Te(e,t)}}function n0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4fv(this.addr,t),Te(e,t)}}function s0(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(we(e,i))return;Wu.set(i),s.uniformMatrix2fv(this.addr,!1,Wu),Te(e,i)}}function r0(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(we(e,i))return;Gu.set(i),s.uniformMatrix3fv(this.addr,!1,Gu),Te(e,i)}}function o0(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(we(e,i))return;Hu.set(i),s.uniformMatrix4fv(this.addr,!1,Hu),Te(e,i)}}function a0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function l0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2iv(this.addr,t),Te(e,t)}}function c0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3iv(this.addr,t),Te(e,t)}}function h0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4iv(this.addr,t),Te(e,t)}}function u0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function f0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2uiv(this.addr,t),Te(e,t)}}function d0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3uiv(this.addr,t),Te(e,t)}}function p0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4uiv(this.addr,t),Te(e,t)}}function m0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(bc.compareFunction=e.isReversedDepthBuffer()?Sa:Ma,r=bc):r=af,e.setTexture2D(t||r,n)}function g0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||cf,n)}function _0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||hf,n)}function x0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||lf,n)}function v0(s){switch(s){case 5126:return t0;case 35664:return e0;case 35665:return i0;case 35666:return n0;case 35674:return s0;case 35675:return r0;case 35676:return o0;case 5124:case 35670:return a0;case 35667:case 35671:return l0;case 35668:case 35672:return c0;case 35669:case 35673:return h0;case 5125:return u0;case 36294:return f0;case 36295:return d0;case 36296:return p0;case 35678:case 36198:case 36298:case 36306:case 35682:return m0;case 35679:case 36299:case 36307:return g0;case 35680:case 36300:case 36308:case 36293:return _0;case 36289:case 36303:case 36311:case 36292:return x0}}function y0(s,t){s.uniform1fv(this.addr,t)}function M0(s,t){let e=xs(t,this.size,2);s.uniform2fv(this.addr,e)}function S0(s,t){let e=xs(t,this.size,3);s.uniform3fv(this.addr,e)}function b0(s,t){let e=xs(t,this.size,4);s.uniform4fv(this.addr,e)}function w0(s,t){let e=xs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function T0(s,t){let e=xs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function E0(s,t){let e=xs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function A0(s,t){s.uniform1iv(this.addr,t)}function C0(s,t){s.uniform2iv(this.addr,t)}function R0(s,t){s.uniform3iv(this.addr,t)}function I0(s,t){s.uniform4iv(this.addr,t)}function P0(s,t){s.uniform1uiv(this.addr,t)}function L0(s,t){s.uniform2uiv(this.addr,t)}function D0(s,t){s.uniform3uiv(this.addr,t)}function N0(s,t){s.uniform4uiv(this.addr,t)}function U0(s,t,e){let i=this.cache,n=t.length,r=Ca(e,n);we(i,r)||(s.uniform1iv(this.addr,r),Te(i,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=bc:o=af;for(let a=0;a!==n;++a)e.setTexture2D(t[a]||o,r[a])}function F0(s,t,e){let i=this.cache,n=t.length,r=Ca(e,n);we(i,r)||(s.uniform1iv(this.addr,r),Te(i,r));for(let o=0;o!==n;++o)e.setTexture3D(t[o]||cf,r[o])}function B0(s,t,e){let i=this.cache,n=t.length,r=Ca(e,n);we(i,r)||(s.uniform1iv(this.addr,r),Te(i,r));for(let o=0;o!==n;++o)e.setTextureCube(t[o]||hf,r[o])}function O0(s,t,e){let i=this.cache,n=t.length,r=Ca(e,n);we(i,r)||(s.uniform1iv(this.addr,r),Te(i,r));for(let o=0;o!==n;++o)e.setTexture2DArray(t[o]||lf,r[o])}function k0(s){switch(s){case 5126:return y0;case 35664:return M0;case 35665:return S0;case 35666:return b0;case 35674:return w0;case 35675:return T0;case 35676:return E0;case 5124:case 35670:return A0;case 35667:case 35671:return C0;case 35668:case 35672:return R0;case 35669:case 35673:return I0;case 5125:return P0;case 36294:return L0;case 36295:return D0;case 36296:return N0;case 35678:case 36198:case 36298:case 36306:case 35682:return U0;case 35679:case 36299:case 36307:return F0;case 35680:case 36300:case 36308:case 36293:return B0;case 36289:case 36303:case 36311:case 36292:return O0}}var wc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=v0(e.type)}},Tc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=k0(e.type)}},Ec=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,o=n.length;r!==o;++r){let a=n[r];a.setValue(t,e[a.id],i)}}},Mc=/(\w+)(\])?(\[|\.)?/g;function Xu(s,t){s.seq.push(t),s.map[t.id]=t}function z0(s,t,e){let i=s.name,n=i.length;for(Mc.lastIndex=0;;){let r=Mc.exec(i),o=Mc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===n){Xu(e,c===void 0?new wc(a,s,t):new Tc(a,s,t));break}else{let f=e.map[a];f===void 0&&(f=new Ec(a),Xu(e,f)),e=f}}}var _s=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);z0(a,l,this)}let n=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(o):r.push(o);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let o=t[n];o.id in e&&i.push(o)}return i}};function qu(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var V0=37297,H0=0;function G0(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=n;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var Yu=new Lt;function W0(s){Gt._getMatrix(Yu,Gt.workingColorSpace,s);let t=`mat3( ${Yu.elements.map(e=>e.toFixed(4))} )`;switch(Gt.getTransfer(s)){case Os:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Zu(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+G0(s.getShaderSource(t),a)}else return r}function X0(s,t){let e=W0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var q0={[Jl]:"Linear",[$l]:"Reinhard",[Kl]:"Cineon",[Ql]:"ACESFilmic",[tc]:"AgX",[ec]:"Neutral",[jl]:"Custom"};function Y0(s,t){let e=q0[t];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var wa=new k;function Z0(){Gt.getLuminanceCoefficients(wa);let s=wa.x.toFixed(4),t=wa.y.toFixed(4),e=wa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dr).join(`
`)}function $0(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function K0(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function dr(s){return s!==""}function Ju(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $u(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Q0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ac(s){return s.replace(Q0,t_)}var j0=new Map;function t_(s,t){let e=Bt[t];if(e===void 0){let i=j0.get(t);if(i!==void 0)e=Bt[i],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ac(e)}var e_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ku(s){return s.replace(e_,i_)}function i_(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Qu(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var n_={[ir]:"SHADOWMAP_TYPE_PCF",[us]:"SHADOWMAP_TYPE_VSM"};function s_(s){return n_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var r_={[fn]:"ENVMAP_TYPE_CUBE",[Ln]:"ENVMAP_TYPE_CUBE",[nr]:"ENVMAP_TYPE_CUBE_UV"};function o_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":r_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var a_={[Ln]:"ENVMAP_MODE_REFRACTION"};function l_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":a_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var c_={[Zl]:"ENVMAP_BLENDING_MULTIPLY",[pu]:"ENVMAP_BLENDING_MIX",[mu]:"ENVMAP_BLENDING_ADD"};function h_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":c_[s.combine]||"ENVMAP_BLENDING_NONE"}function u_(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function f_(s,t,e,i){let n=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=s_(e),c=o_(e),h=l_(e),f=h_(e),u=u_(e),d=J0(e),g=$0(r),_=n.createProgram(),m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(dr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(dr).join(`
`),p.length>0&&(p+=`
`)):(m=[Qu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dr).join(`
`),p=[Qu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?Bt.tonemapping_pars_fragment:"",e.toneMapping!==xi?Y0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,X0("linearToOutputTexel",e.outputColorSpace),Z0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(dr).join(`
`)),o=Ac(o),o=Ju(o,e),o=$u(o,e),a=Ac(a),a=Ju(a,e),a=$u(a,e),o=Ku(o),a=Ku(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===fc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=S+m+o,y=S+p+a,b=qu(n,n.VERTEX_SHADER,E),w=qu(n,n.FRAGMENT_SHADER,y);n.attachShader(_,b),n.attachShader(_,w),e.index0AttributeName!==void 0?n.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(_,0,"position"),n.linkProgram(_);function R(L){if(s.debug.checkShaderErrors){let F=n.getProgramInfoLog(_)||"",B=n.getShaderInfoLog(b)||"",P=n.getShaderInfoLog(w)||"",z=F.trim(),Y=B.trim(),q=P.trim(),it=!0,X=!0;if(n.getProgramParameter(_,n.LINK_STATUS)===!1)if(it=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,_,b,w);else{let j=Zu(n,b,"vertex"),et=Zu(n,w,"fragment");Pt("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(_,n.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+z+`
`+j+`
`+et)}else z!==""?Rt("WebGLProgram: Program Info Log:",z):(Y===""||q==="")&&(X=!1);X&&(L.diagnostics={runnable:it,programLog:z,vertexShader:{log:Y,prefix:m},fragmentShader:{log:q,prefix:p}})}n.deleteShader(b),n.deleteShader(w),v=new _s(n,_),T=K0(n,_)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=n.getProgramParameter(_,V0)),I},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=H0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=w,this}var d_=0,Cc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Rc(t),e.set(t,i)),i}},Rc=class{constructor(t){this.id=d_++,this.code=t,this.usedTimes=0}};function p_(s){return s===mn||s===cr||s===hr}function m_(s,t,e,i,n,r){let o=new Gs,a=new Cc,l=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,T,I,L,F,B){let P=L.fog,z=F.geometry,Y=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,q=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,it=t.get(v.envMap||Y,q),X=it&&it.mapping===nr?it.image.height:null,j=d[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Rt("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let et=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Ct=et!==void 0?et.length:0,Et=0;z.morphAttributes.position!==void 0&&(Et=1),z.morphAttributes.normal!==void 0&&(Et=2),z.morphAttributes.color!==void 0&&(Et=3);let oe,qt,Jt,J;if(j){let le=Ni[j];oe=le.vertexShader,qt=le.fragmentShader}else{oe=v.vertexShader,qt=v.fragmentShader;let le=a.getVertexShaderStage(v),$t=a.getFragmentShaderStage(v);a.update(v,le,$t),Jt=le.id,J=$t.id}let tt=s.getRenderTarget(),vt=s.state.buffers.depth.getReversed(),Dt=F.isInstancedMesh===!0,_t=F.isBatchedMesh===!0,Ot=!!v.map,Me=!!v.matcap,zt=!!it,Zt=!!v.aoMap,ae=!!v.lightMap,Ht=!!v.bumpMap&&v.wireframe===!1,fe=!!v.normalMap,Ee=!!v.displacementMap,Ge=!!v.emissiveMap,de=!!v.metalnessMap,ge=!!v.roughnessMap,U=v.anisotropy>0,Le=v.clearcoat>0,te=v.dispersion>0,C=v.retroreflectivity>0,x=v.iridescence>0,O=v.sheen>0,G=v.transmission>0,Z=U&&!!v.anisotropyMap,st=Le&&!!v.clearcoatMap,rt=Le&&!!v.clearcoatNormalMap,$=Le&&!!v.clearcoatRoughnessMap,Q=x&&!!v.iridescenceMap,ot=x&&!!v.iridescenceThicknessMap,wt=O&&!!v.sheenColorMap,ht=O&&!!v.sheenRoughnessMap,at=!!v.specularMap,Tt=!!v.specularColorMap,It=!!v.specularIntensityMap,Nt=G&&!!v.transmissionMap,N=G&&!!v.thicknessMap,lt=!!v.gradientMap,K=!!v.alphaMap,ct=v.alphaTest>0,pt=!!v.alphaHash,nt=!!v.extensions,At=xi;v.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(At=s.toneMapping);let St={shaderID:j,shaderType:v.type,shaderName:v.name,vertexShader:oe,fragmentShader:qt,defines:v.defines,customVertexShaderID:Jt,customFragmentShaderID:J,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:_t,batchingColor:_t&&F._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&F.instanceColor!==null,instancingMorph:Dt&&F.morphTexture!==null,outputColorSpace:tt===null?s.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Gt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ot,matcap:Me,envMap:zt,envMapMode:zt&&it.mapping,envMapCubeUVHeight:X,aoMap:Zt,lightMap:ae,bumpMap:Ht,normalMap:fe,displacementMap:Ee,emissiveMap:Ge,normalMapObjectSpace:fe&&v.normalMapType===vu,normalMapTangentSpace:fe&&v.normalMapType===hc,packedNormalMap:fe&&v.normalMapType===hc&&p_(v.normalMap.format),metalnessMap:de,roughnessMap:ge,anisotropy:U,anisotropyMap:Z,clearcoat:Le,clearcoatMap:st,clearcoatNormalMap:rt,clearcoatRoughnessMap:$,dispersion:te,retroreflection:C,iridescence:x,iridescenceMap:Q,iridescenceThicknessMap:ot,sheen:O,sheenColorMap:wt,sheenRoughnessMap:ht,specularMap:at,specularColorMap:Tt,specularIntensityMap:It,transmission:G,transmissionMap:Nt,thicknessMap:N,gradientMap:lt,opaque:v.transparent===!1&&v.blending===fs&&v.alphaToCoverage===!1,alphaMap:K,alphaTest:ct,alphaHash:pt,combine:v.combine,mapUv:Ot&&g(v.map.channel),aoMapUv:Zt&&g(v.aoMap.channel),lightMapUv:ae&&g(v.lightMap.channel),bumpMapUv:Ht&&g(v.bumpMap.channel),normalMapUv:fe&&g(v.normalMap.channel),displacementMapUv:Ee&&g(v.displacementMap.channel),emissiveMapUv:Ge&&g(v.emissiveMap.channel),metalnessMapUv:de&&g(v.metalnessMap.channel),roughnessMapUv:ge&&g(v.roughnessMap.channel),anisotropyMapUv:Z&&g(v.anisotropyMap.channel),clearcoatMapUv:st&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:rt&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:ht&&g(v.sheenRoughnessMap.channel),specularMapUv:at&&g(v.specularMap.channel),specularColorMapUv:Tt&&g(v.specularColorMap.channel),specularIntensityMapUv:It&&g(v.specularIntensityMap.channel),transmissionMapUv:Nt&&g(v.transmissionMap.channel),thicknessMapUv:N&&g(v.thicknessMap.channel),alphaMapUv:K&&g(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(fe||U),vertexNormals:!!z.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!z.attributes.uv&&(Ot||K),fog:!!P,useFog:v.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||z.attributes.normal===void 0&&fe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:vt,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Et,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:At,decodeVideoTexture:Ot&&v.map.isVideoTexture===!0&&Gt.getTransfer(v.map.colorSpace)===Qt,decodeVideoTextureEmissive:Ge&&v.emissiveMap.isVideoTexture===!0&&Gt.getTransfer(v.emissiveMap.colorSpace)===Qt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Pi,flipSided:v.side===He,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:nt&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&v.extensions.multiDraw===!0||_t)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function m(v){let T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)T.push(I),T.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(p(T,v),S(T,v),T.push(s.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function p(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numSunLights),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numSunLightShadows),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function S(v,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function E(v){let T=d[v.type],I;if(T){let L=Ni[T];I=Du.clone(L.uniforms)}else I=v.uniforms;return I}function y(v,T){let I=h.get(T);return I!==void 0?++I.usedTimes:(I=new f_(s,T,v,n),c.push(I),h.set(T,I)),I}function b(v){if(--v.usedTimes===0){let T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function w(v){a.remove(v)}function R(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:E,acquireProgram:y,releaseProgram:b,releaseShaderCache:w,programs:c,dispose:R}}function g_(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function i(o){s.delete(o)}function n(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function __(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function ju(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function tf(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function o(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function a(u,d,g,_,m,p){let S=s[t];return S===void 0?(S={id:u.id,object:u,geometry:d,material:g,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:p},s[t]=S):(S.id=u.id,S.object=u,S.geometry=d,S.material=g,S.materialVariant=o(u),S.groupOrder=_,S.renderOrder=u.renderOrder,S.z=m,S.group=p),t++,S}function l(u,d,g,_,m,p,S){S.reversedDepth===!0&&(m=-m);let E=a(u,d,g,_,m,p);g.transmission>0?i.push(E):g.transparent===!0?n.push(E):e.push(E)}function c(u,d,g,_,m,p){let S=a(u,d,g,_,m,p);g.transmission>0?i.unshift(S):g.transparent===!0?n.unshift(S):e.unshift(S)}function h(u,d){e.length>1&&e.sort(u||__),i.length>1&&i.sort(d||ju),n.length>1&&n.sort(d||ju)}function f(){for(let u=t,d=s.length;u<d;u++){let g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:f,sort:h}}function x_(){let s=new WeakMap;function t(i,n){let r=s.get(i),o;return r===void 0?(o=new tf,s.set(i,[o])):n>=r.length?(o=new tf,r.push(o)):o=r[n],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function v_(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new k,color:new Wt};break;case"SpotLight":e={position:new k,direction:new k,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new k,halfWidth:new k,halfHeight:new k};break}return s[t.id]=e,e}}}function y_(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var M_=0;function S_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function b_(s){let t=new v_,e=y_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);let n=new k,r=new kt,o=new kt;function a(c){let h=0,f=0,u=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,S=0,E=0,y=0,b=0,w=0,R=0,v=0,T=0,I=0;c.sort(S_);for(let F=0,B=c.length;F<B;F++){let P=c[F],z=P.color,Y=P.intensity,q=P.distance,it=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===mn?it=P.shadow.map.texture:it=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=z.r*Y,f+=z.g*Y,u+=z.b*Y;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],Y);I++}else if(P.isSunLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let j=P.shadow,et=e.get(P);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),i.sunShadow[g]=et,i.sunShadowMap[g]=it;let Ct=j.getViewportCount();for(let Et=0;Et<Ct;Et++)i.sunShadowMatrix[_+Et]=j.getMatrix(Et),i.sunShadowCascade[_+Et]=j._cascadeData[Et];_+=Ct,g++}i.sun[d]=X,d++}else if(P.isDirectionalLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let j=P.shadow,et=e.get(P);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,i.directionalShadow[m]=et,i.directionalShadowMap[m]=it,i.directionalShadowMatrix[m]=P.shadow.matrix,b++}i.directional[m]=X,m++}else if(P.isSpotLight){let X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(z).multiplyScalar(Y),X.distance=q,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[S]=X;let j=P.shadow;if(P.map&&(i.spotLightMap[v]=P.map,v++,j.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[S]=j.matrix,P.castShadow){let et=e.get(P);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,i.spotShadow[S]=et,i.spotShadowMap[S]=it,R++}S++}else if(P.isRectAreaLight){let X=t.get(P);X.color.copy(z).multiplyScalar(Y),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[E]=X,E++}else if(P.isPointLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let j=P.shadow,et=e.get(P);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,et.shadowCameraNear=j.camera.near,et.shadowCameraFar=j.camera.far,i.pointShadow[p]=et,i.pointShadowMap[p]=it,i.pointShadowMatrix[p]=P.shadow.matrix,w++}i.point[p]=X,p++}else if(P.isHemisphereLight){let X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(Y),X.groundColor.copy(P.groundColor).multiplyScalar(Y),i.hemi[y]=X,y++}}E>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;let L=i.hash;(L.sunLength!==d||L.directionalLength!==m||L.pointLength!==p||L.spotLength!==S||L.rectAreaLength!==E||L.hemiLength!==y||L.numSunShadows!==g||L.numDirectionalShadows!==b||L.numPointShadows!==w||L.numSpotShadows!==R||L.numSpotMaps!==v||L.numLightProbes!==I)&&(i.sun.length=d,i.directional.length=m,i.spot.length=S,i.rectArea.length=E,i.point.length=p,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.directionalShadowMatrix.length=b,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=R,i.spotShadowMap.length=R,i.spotLightMatrix.length=R+v-T,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=I,L.sunLength=d,L.directionalLength=m,L.pointLength=p,L.spotLength=S,L.rectAreaLength=E,L.hemiLength=y,L.numSunShadows=g,L.numDirectionalShadows=b,L.numPointShadows=w,L.numSpotShadows=R,L.numSpotMaps=v,L.numLightProbes=I,i.version=M_++)}function l(c,h){let f=0,u=0,d=0,g=0,_=0,m=0,p=h.matrixWorldInverse;for(let S=0,E=c.length;S<E;S++){let y=c[S];if(y.isSunLight){let b=i.sun[f];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(p),f++}else if(y.isDirectionalLight){let b=i.directional[u];b.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(n),b.direction.transformDirection(p),u++}else if(y.isSpotLight){let b=i.spot[g];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(n),b.direction.transformDirection(p),g++}else if(y.isRectAreaLight){let b=i.rectArea[_];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),o.identity(),r.copy(y.matrixWorld),r.premultiply(p),o.extractRotation(r),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){let b=i.point[d];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),d++}else if(y.isHemisphereLight){let b=i.hemi[m];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(p),m++}}}return{setup:a,setupView:l,state:i}}function ef(s){let t=new b_(s),e=[],i=[],n=[];function r(u){f.camera=u,e.length=0,i.length=0,n.length=0}function o(u){e.push(u)}function a(u){i.push(u)}function l(u){n.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let f={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function w_(s){let t=new WeakMap;function e(n,r=0){let o=t.get(n),a;return o===void 0?(a=new ef(s),t.set(n,[a])):r>=o.length?(a=new ef(s),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var T_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,A_=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],C_=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],nf=new kt,fr=new k,Sc=new k;function R_(s,t,e){let i=new Js,n=new Ft,r=new Ft,o=new ne,a=new So,l=new bo,c={},h=e.maxTextureSize,f={[un]:He,[He]:un,[Pi]:Pi},u=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:T_,fragmentShader:E_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let g=new Ve;g.setAttribute("position",new qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ti(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ir;let p=this.type;this.render=function(w,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Jh&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ir);let T=s.getRenderTarget(),I=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),F=s.state;F.setBlending(Li),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let B=p!==this.type;B&&R.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(z=>z.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,z=w.length;P<z;P++){let Y=w[P],q=Y.shadow;if(q===void 0){Rt("WebGLShadowMap:",Y,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;n.copy(q.mapSize);let it=q.getFrameExtents();n.multiply(it),r.copy(q.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/it.x),n.x=r.x*it.x,q.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/it.y),n.y=r.y*it.y,q.mapSize.y=r.y));let X=s.state.buffers.depth.getReversed();if(q.camera._reversedDepth=X,q.map===null||B===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===us){if(Y.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Ye(n.x,n.y,{format:mn,type:yi,minFilter:Pe,magFilter:Pe,generateMipmaps:!1}),q.map.texture.name=Y.name+".shadowMap",q.map.depthTexture=new an(n.x,n.y,li),q.map.depthTexture.name=Y.name+".shadowMapDepth",q.map.depthTexture.format=Ci,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Ce,q.map.depthTexture.magFilter=Ce}else Y.isPointLight?(q.map=new Ea(n.x),q.map.depthTexture=new yo(n.x,vi)):(q.map=new Ye(n.x,n.y),q.map.depthTexture=new an(n.x,n.y,vi)),q.map.depthTexture.name=Y.name+".shadowMap",q.map.depthTexture.format=Ci,this.type===ir?(q.map.depthTexture.compareFunction=X?Sa:Ma,q.map.depthTexture.minFilter=Pe,q.map.depthTexture.magFilter=Pe):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Ce,q.map.depthTexture.magFilter=Ce);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==n.x||q.map.height!==n.y)&&q.map.setSize(n.x,n.y);let j=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();Y.isPointLight!==!0&&q.updateMatrices(Y,v);for(let et=0;et<j;et++){let Ct=q.getCamera(et);if(Y.isPointLight){let Et=q.camera,oe=q.matrix,qt=Y.distance||Et.far;qt!==Et.far&&(Et.far=qt,Et.updateProjectionMatrix()),fr.setFromMatrixPosition(Y.matrixWorld),Et.position.copy(fr),Sc.copy(Et.position),Sc.add(A_[et]),Et.up.copy(C_[et]),Et.lookAt(Sc),Et.updateMatrixWorld(),oe.makeTranslation(-fr.x,-fr.y,-fr.z),nf.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),q._frustum.setFromProjectionMatrix(nf,Et.coordinateSystem,Et.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)s.setRenderTarget(q.map,et),s.clear();else{et===0&&(s.setRenderTarget(q.map),s.clear());let Et=q.getViewport(et);o.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),F.viewport(o)}i=q.getFrustum(et),y(R,v,Ct,Y,this.type)}q.isPointLightShadow!==!0&&this.type===us&&S(q,v),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(T,I,L)};function S(w,R){let v=t.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null?w.mapPass=new Ye(n.x,n.y,{format:mn,type:yi}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(R,null,v,u,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(R,null,v,d,_,null)}function E(w,R,v,T){let I=null,L=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)I=L;else if(I=v.isPointLight===!0?l:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let F=I.uuid,B=R.uuid,P=c[F];P===void 0&&(P={},c[F]=P);let z=P[B];z===void 0&&(z=I.clone(),P[B]=z,R.addEventListener("dispose",b)),I=z}if(I.visible=R.visible,I.wireframe=R.wireframe,T===us?I.side=R.shadowSide!==null?R.shadowSide:R.side:I.side=R.shadowSide!==null?R.shadowSide:f[R.side],I.alphaMap=R.alphaMap,I.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,I.map=R.map,I.clipShadows=R.clipShadows,I.clippingPlanes=R.clippingPlanes,I.clipIntersection=R.clipIntersection,I.displacementMap=R.displacementMap,I.displacementScale=R.displacementScale,I.displacementBias=R.displacementBias,I.wireframeLinewidth=R.wireframeLinewidth,I.linewidth=R.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let F=s.properties.get(I);F.light=v}return I}function y(w,R,v,T,I){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===us)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);let B=t.update(w),P=w.material;if(Array.isArray(P)){let z=B.groups;for(let Y=0,q=z.length;Y<q;Y++){let it=z[Y],X=P[it.materialIndex];if(X&&X.visible){let j=E(w,X,T,I);w.onBeforeShadow(s,w,R,v,B,j,it),s.renderBufferDirect(v,null,B,j,w,it),w.onAfterShadow(s,w,R,v,B,j,it)}}}else if(P.visible){let z=E(w,P,T,I);w.onBeforeShadow(s,w,R,v,B,z,null),s.renderBufferDirect(v,null,B,z,w,null),w.onAfterShadow(s,w,R,v,B,z,null)}}let F=w.children;for(let B=0,P=F.length;B<P;B++)y(F[B],R,v,T,I)}function b(w){w.target.removeEventListener("dispose",b);for(let v in c){let T=c[v],I=w.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function I_(s,t){function e(){let N=!1,lt=new ne,K=null,ct=new ne(0,0,0,0);return{setMask:function(pt){K!==pt&&!N&&(s.colorMask(pt,pt,pt,pt),K=pt)},setLocked:function(pt){N=pt},setClear:function(pt,nt,At,St,le){le===!0&&(pt*=St,nt*=St,At*=St),lt.set(pt,nt,At,St),ct.equals(lt)===!1&&(s.clearColor(pt,nt,At,St),ct.copy(lt))},reset:function(){N=!1,K=null,ct.set(-1,0,0,0)}}}function i(){let N=!1,lt=!1,K=null,ct=null,pt=null;return{setReversed:function(nt){if(lt!==nt){let At=t.get("EXT_clip_control");nt?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT),lt=nt;let St=pt;pt=null,this.setClear(St)}},getReversed:function(){return lt},setTest:function(nt){nt?tt(s.DEPTH_TEST):vt(s.DEPTH_TEST)},setMask:function(nt){K!==nt&&!N&&(s.depthMask(nt),K=nt)},setFunc:function(nt){if(lt&&(nt=Iu[nt]),ct!==nt){switch(nt){case Qr:s.depthFunc(s.NEVER);break;case jr:s.depthFunc(s.ALWAYS);break;case to:s.depthFunc(s.LESS);break;case rs:s.depthFunc(s.LEQUAL);break;case eo:s.depthFunc(s.EQUAL);break;case io:s.depthFunc(s.GEQUAL);break;case no:s.depthFunc(s.GREATER);break;case so:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ct=nt}},setLocked:function(nt){N=nt},setClear:function(nt){pt!==nt&&(pt=nt,lt&&(nt=1-nt),s.clearDepth(nt))},reset:function(){N=!1,K=null,ct=null,pt=null,lt=!1}}}function n(){let N=!1,lt=null,K=null,ct=null,pt=null,nt=null,At=null,St=null,le=null;return{setTest:function($t){N||($t?tt(s.STENCIL_TEST):vt(s.STENCIL_TEST))},setMask:function($t){lt!==$t&&!N&&(s.stencilMask($t),lt=$t)},setFunc:function($t,hi,Si){(K!==$t||ct!==hi||pt!==Si)&&(s.stencilFunc($t,hi,Si),K=$t,ct=hi,pt=Si)},setOp:function($t,hi,Si){(nt!==$t||At!==hi||St!==Si)&&(s.stencilOp($t,hi,Si),nt=$t,At=hi,St=Si)},setLocked:function($t){N=$t},setClear:function($t){le!==$t&&(s.clearStencil($t),le=$t)},reset:function(){N=!1,lt=null,K=null,ct=null,pt=null,nt=null,At=null,St=null,le=null}}}let r=new e,o=new i,a=new n,l=new WeakMap,c=new WeakMap,h={},f={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,S=null,E=null,y=null,b=null,w=null,R=null,v=new Wt(0,0,0),T=0,I=!1,L=null,F=null,B=null,P=null,z=null,Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,it=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(X)[1]),q=it>=1):X.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),q=it>=2);let j=null,et={},Ct=s.getParameter(s.SCISSOR_BOX),Et=s.getParameter(s.VIEWPORT),oe=new ne().fromArray(Ct),qt=new ne().fromArray(Et);function Jt(N,lt,K,ct){let pt=new Uint8Array(4),nt=s.createTexture();s.bindTexture(N,nt),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let At=0;At<K;At++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(lt,0,s.RGBA,1,1,ct,0,s.RGBA,s.UNSIGNED_BYTE,pt):s.texImage2D(lt+At,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pt);return nt}let J={};J[s.TEXTURE_2D]=Jt(s.TEXTURE_2D,s.TEXTURE_2D,1),J[s.TEXTURE_CUBE_MAP]=Jt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[s.TEXTURE_2D_ARRAY]=Jt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),J[s.TEXTURE_3D]=Jt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),tt(s.DEPTH_TEST),o.setFunc(rs),Ht(!1),fe(Hl),tt(s.CULL_FACE),Zt(Li);function tt(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function vt(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function Dt(N,lt){return u[N]!==lt?(s.bindFramebuffer(N,lt),u[N]=lt,N===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=lt),N===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=lt),!0):!1}function _t(N,lt){let K=g,ct=!1;if(N){K=d.get(lt),K===void 0&&(K=[],d.set(lt,K));let pt=N.textures;if(K.length!==pt.length||K[0]!==s.COLOR_ATTACHMENT0){for(let nt=0,At=pt.length;nt<At;nt++)K[nt]=s.COLOR_ATTACHMENT0+nt;K.length=pt.length,ct=!0}}else K[0]!==s.BACK&&(K[0]=s.BACK,ct=!0);ct&&s.drawBuffers(K)}function Ot(N){return _!==N?(s.useProgram(N),_=N,!0):!1}let Me={[Pn]:s.FUNC_ADD,[Kh]:s.FUNC_SUBTRACT,[Qh]:s.FUNC_REVERSE_SUBTRACT};Me[jh]=s.MIN,Me[tu]=s.MAX;let zt={[eu]:s.ZERO,[iu]:s.ONE,[nu]:s.SRC_COLOR,[ql]:s.SRC_ALPHA,[cu]:s.SRC_ALPHA_SATURATE,[au]:s.DST_COLOR,[ru]:s.DST_ALPHA,[su]:s.ONE_MINUS_SRC_COLOR,[Yl]:s.ONE_MINUS_SRC_ALPHA,[lu]:s.ONE_MINUS_DST_COLOR,[ou]:s.ONE_MINUS_DST_ALPHA,[hu]:s.CONSTANT_COLOR,[uu]:s.ONE_MINUS_CONSTANT_COLOR,[fu]:s.CONSTANT_ALPHA,[du]:s.ONE_MINUS_CONSTANT_ALPHA};function Zt(N,lt,K,ct,pt,nt,At,St,le,$t){if(N===Li){m===!0&&(vt(s.BLEND),m=!1);return}if(m===!1&&(tt(s.BLEND),m=!0),N!==$h){if(N!==p||$t!==I){if((S!==Pn||b!==Pn)&&(s.blendEquation(s.FUNC_ADD),S=Pn,b=Pn),$t)switch(N){case fs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Gl:s.blendFunc(s.ONE,s.ONE);break;case Wl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Xl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Pt("WebGLState: Invalid blending: ",N);break}else switch(N){case fs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Gl:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Wl:Pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xl:Pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pt("WebGLState: Invalid blending: ",N);break}E=null,y=null,w=null,R=null,v.set(0,0,0),T=0,p=N,I=$t}return}pt=pt||lt,nt=nt||K,At=At||ct,(lt!==S||pt!==b)&&(s.blendEquationSeparate(Me[lt],Me[pt]),S=lt,b=pt),(K!==E||ct!==y||nt!==w||At!==R)&&(s.blendFuncSeparate(zt[K],zt[ct],zt[nt],zt[At]),E=K,y=ct,w=nt,R=At),(St.equals(v)===!1||le!==T)&&(s.blendColor(St.r,St.g,St.b,le),v.copy(St),T=le),p=N,I=!1}function ae(N,lt){N.side===Pi?vt(s.CULL_FACE):tt(s.CULL_FACE);let K=N.side===He;lt&&(K=!K),Ht(K),N.blending===fs&&N.transparent===!1?Zt(Li):Zt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let ct=N.stencilWrite;a.setTest(ct),ct&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ge(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?tt(s.SAMPLE_ALPHA_TO_COVERAGE):vt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(N){L!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),L=N)}function fe(N){N!==Yh?(tt(s.CULL_FACE),N!==F&&(N===Hl?s.cullFace(s.BACK):N===Zh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):vt(s.CULL_FACE),F=N}function Ee(N){N!==B&&(q&&s.lineWidth(N),B=N)}function Ge(N,lt,K){N?(tt(s.POLYGON_OFFSET_FILL),(P!==lt||z!==K)&&(P=lt,z=K,o.getReversed()&&(lt=-lt),s.polygonOffset(lt,K))):vt(s.POLYGON_OFFSET_FILL)}function de(N){N?tt(s.SCISSOR_TEST):vt(s.SCISSOR_TEST)}function ge(N){N===void 0&&(N=s.TEXTURE0+Y-1),j!==N&&(s.activeTexture(N),j=N)}function U(N,lt,K){K===void 0&&(j===null?K=s.TEXTURE0+Y-1:K=j);let ct=et[K];ct===void 0&&(ct={type:void 0,texture:void 0},et[K]=ct),(ct.type!==N||ct.texture!==lt)&&(j!==K&&(s.activeTexture(K),j=K),s.bindTexture(N,lt||J[N]),ct.type=N,ct.texture=lt)}function Le(){let N=et[j];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function te(){try{s.compressedTexImage2D(...arguments)}catch(N){Pt("WebGLState:",N)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(N){Pt("WebGLState:",N)}}function x(){try{s.texSubImage2D(...arguments)}catch(N){Pt("WebGLState:",N)}}function O(){try{s.texSubImage3D(...arguments)}catch(N){Pt("WebGLState:",N)}}function G(){try{s.compressedTexSubImage2D(...arguments)}catch(N){Pt("WebGLState:",N)}}function Z(){try{s.compressedTexSubImage3D(...arguments)}catch(N){Pt("WebGLState:",N)}}function st(){try{s.texStorage2D(...arguments)}catch(N){Pt("WebGLState:",N)}}function rt(){try{s.texStorage3D(...arguments)}catch(N){Pt("WebGLState:",N)}}function $(){try{s.texImage2D(...arguments)}catch(N){Pt("WebGLState:",N)}}function Q(){try{s.texImage3D(...arguments)}catch(N){Pt("WebGLState:",N)}}function ot(N){return f[N]!==void 0?f[N]:s.getParameter(N)}function wt(N,lt){f[N]!==lt&&(s.pixelStorei(N,lt),f[N]=lt)}function ht(N){oe.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),oe.copy(N))}function at(N){qt.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),qt.copy(N))}function Tt(N,lt){let K=c.get(lt);K===void 0&&(K=new WeakMap,c.set(lt,K));let ct=K.get(N);ct===void 0&&(ct=s.getUniformBlockIndex(lt,N.name),K.set(N,ct))}function It(N,lt){let ct=c.get(lt).get(N);l.get(lt)!==ct&&(s.uniformBlockBinding(lt,ct,N.__bindingPointIndex),l.set(lt,ct))}function Nt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},j=null,et={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,S=null,E=null,y=null,b=null,w=null,R=null,v=new Wt(0,0,0),T=0,I=!1,L=null,F=null,B=null,P=null,z=null,oe.set(0,0,s.canvas.width,s.canvas.height),qt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:tt,disable:vt,bindFramebuffer:Dt,drawBuffers:_t,useProgram:Ot,setBlending:Zt,setMaterial:ae,setFlipSided:Ht,setCullFace:fe,setLineWidth:Ee,setPolygonOffset:Ge,setScissorTest:de,activeTexture:ge,bindTexture:U,unbindTexture:Le,compressedTexImage2D:te,compressedTexImage3D:C,texImage2D:$,texImage3D:Q,pixelStorei:wt,getParameter:ot,updateUBOMapping:Tt,uniformBlockBinding:It,texStorage2D:st,texStorage3D:rt,texSubImage2D:x,texSubImage3D:O,compressedTexSubImage2D:G,compressedTexSubImage3D:Z,scissor:ht,viewport:at,reset:Nt}}function P_(s,t,e,i,n,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ft,h=new WeakMap,f=new Set,u,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,x){return g?new OffscreenCanvas(C,x):zs("canvas")}function m(C,x,O){let G=1,Z=te(C);if((Z.width>O||Z.height>O)&&(G=O/Math.max(Z.width,Z.height)),G<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let st=Math.floor(G*Z.width),rt=Math.floor(G*Z.height);u===void 0&&(u=_(st,rt));let $=x?_(st,rt):u;return $.width=st,$.height=rt,$.getContext("2d").drawImage(C,0,0,st,rt),Rt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+st+"x"+rt+")."),$}else return"data"in C&&Rt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function p(C){return C.generateMipmaps}function S(C){s.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(C,x,O,G,Z,st=!1){if(C!==null){if(s[C]!==void 0)return s[C];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let rt;G&&(rt=t.get("EXT_texture_norm16"),rt||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=x;if(x===s.RED&&(O===s.FLOAT&&($=s.R32F),O===s.HALF_FLOAT&&($=s.R16F),O===s.UNSIGNED_BYTE&&($=s.R8),O===s.UNSIGNED_SHORT&&rt&&($=rt.R16_EXT),O===s.SHORT&&rt&&($=rt.R16_SNORM_EXT)),x===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.R8UI),O===s.UNSIGNED_SHORT&&($=s.R16UI),O===s.UNSIGNED_INT&&($=s.R32UI),O===s.BYTE&&($=s.R8I),O===s.SHORT&&($=s.R16I),O===s.INT&&($=s.R32I)),x===s.RG&&(O===s.FLOAT&&($=s.RG32F),O===s.HALF_FLOAT&&($=s.RG16F),O===s.UNSIGNED_BYTE&&($=s.RG8),O===s.UNSIGNED_SHORT&&rt&&($=rt.RG16_EXT),O===s.SHORT&&rt&&($=rt.RG16_SNORM_EXT)),x===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.RG8UI),O===s.UNSIGNED_SHORT&&($=s.RG16UI),O===s.UNSIGNED_INT&&($=s.RG32UI),O===s.BYTE&&($=s.RG8I),O===s.SHORT&&($=s.RG16I),O===s.INT&&($=s.RG32I)),x===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.RGB8UI),O===s.UNSIGNED_SHORT&&($=s.RGB16UI),O===s.UNSIGNED_INT&&($=s.RGB32UI),O===s.BYTE&&($=s.RGB8I),O===s.SHORT&&($=s.RGB16I),O===s.INT&&($=s.RGB32I)),x===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.RGBA8UI),O===s.UNSIGNED_SHORT&&($=s.RGBA16UI),O===s.UNSIGNED_INT&&($=s.RGBA32UI),O===s.BYTE&&($=s.RGBA8I),O===s.SHORT&&($=s.RGBA16I),O===s.INT&&($=s.RGBA32I)),x===s.RGB&&(O===s.UNSIGNED_SHORT&&rt&&($=rt.RGB16_EXT),O===s.SHORT&&rt&&($=rt.RGB16_SNORM_EXT),O===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),O===s.UNSIGNED_INT_10F_11F_11F_REV&&($=s.R11F_G11F_B10F)),x===s.RGBA){let Q=st?Os:Gt.getTransfer(Z);O===s.FLOAT&&($=s.RGBA32F),O===s.HALF_FLOAT&&($=s.RGBA16F),O===s.UNSIGNED_BYTE&&($=Q===Qt?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT&&rt&&($=rt.RGBA16_EXT),O===s.SHORT&&rt&&($=rt.RGBA16_SNORM_EXT),O===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function b(C,x){let O;return C?x===null||x===vi||x===ps?O=s.DEPTH24_STENCIL8:x===li?O=s.DEPTH32F_STENCIL8:x===ds&&(O=s.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===vi||x===ps?O=s.DEPTH_COMPONENT24:x===li?O=s.DEPTH_COMPONENT32F:x===ds&&(O=s.DEPTH_COMPONENT16),O}function w(C,x){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ce&&C.minFilter!==Pe?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function R(C){let x=C.target;x.removeEventListener("dispose",R),T(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&f.delete(x)}function v(C){let x=C.target;x.removeEventListener("dispose",v),L(x)}function T(C){let x=i.get(C);if(x.__webglInit===void 0)return;let O=C.source,G=d.get(O);if(G){let Z=G[x.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(C),Object.keys(G).length===0&&d.delete(O)}i.remove(C)}function I(C){let x=i.get(C);s.deleteTexture(x.__webglTexture);let O=C.source,G=d.get(O);delete G[x.__cacheKey],o.memory.textures--}function L(C){let x=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(x.__webglFramebuffer[G]))for(let Z=0;Z<x.__webglFramebuffer[G].length;Z++)s.deleteFramebuffer(x.__webglFramebuffer[G][Z]);else s.deleteFramebuffer(x.__webglFramebuffer[G]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[G])}else{if(Array.isArray(x.__webglFramebuffer))for(let G=0;G<x.__webglFramebuffer.length;G++)s.deleteFramebuffer(x.__webglFramebuffer[G]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let G=0;G<x.__webglColorRenderbuffer.length;G++)x.__webglColorRenderbuffer[G]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[G]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=C.textures;for(let G=0,Z=O.length;G<Z;G++){let st=i.get(O[G]);st.__webglTexture&&(s.deleteTexture(st.__webglTexture),o.memory.textures--),i.remove(O[G])}i.remove(C)}let F=0;function B(){F=0}function P(){return F}function z(C){F=C}function Y(){let C=F;return C>=n.maxTextures&&Rt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+n.maxTextures),F+=1,C}function q(C){let x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function it(C,x){let O=i.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&O.__version!==C.version){let G=C.image;if(G===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{vt(O,C,x);return}}else C.isExternalTexture&&(O.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+x)}function X(C,x){let O=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){vt(O,C,x);return}else C.isExternalTexture&&(O.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+x)}function j(C,x){let O=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){vt(O,C,x);return}e.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+x)}function et(C,x){let O=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&O.__version!==C.version){Dt(O,C,x);return}e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+x)}let Ct={[ro]:s.REPEAT,[Ai]:s.CLAMP_TO_EDGE,[oo]:s.MIRRORED_REPEAT},Et={[Ce]:s.NEAREST,[_u]:s.NEAREST_MIPMAP_NEAREST,[sr]:s.NEAREST_MIPMAP_LINEAR,[Pe]:s.LINEAR,[Oo]:s.LINEAR_MIPMAP_NEAREST,[dn]:s.LINEAR_MIPMAP_LINEAR},oe={[Mu]:s.NEVER,[Eu]:s.ALWAYS,[Su]:s.LESS,[Ma]:s.LEQUAL,[bu]:s.EQUAL,[Sa]:s.GEQUAL,[wu]:s.GREATER,[Tu]:s.NOTEQUAL};function qt(C,x){if(x.type===li&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Pe||x.magFilter===Oo||x.magFilter===sr||x.magFilter===dn||x.minFilter===Pe||x.minFilter===Oo||x.minFilter===sr||x.minFilter===dn)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Ct[x.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Ct[x.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Ct[x.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Et[x.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Et[x.minFilter]),x.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,oe[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ce||x.minFilter!==sr&&x.minFilter!==dn||x.type===li&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,n.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Jt(C,x){let O=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",R));let G=x.source,Z=d.get(G);Z===void 0&&(Z={},d.set(G,Z));let st=q(x);if(st!==C.__cacheKey){Z[st]===void 0&&(Z[st]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Z[st].usedTimes++;let rt=Z[C.__cacheKey];rt!==void 0&&(Z[C.__cacheKey].usedTimes--,rt.usedTimes===0&&I(x)),C.__cacheKey=st,C.__webglTexture=Z[st].texture}return O}function J(C,x,O){return Math.floor(Math.floor(C/O)/x)}function tt(C,x,O,G){let st=C.updateRanges;if(st.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,x.width,x.height,O,G,x.data);else{st.sort((wt,ht)=>wt.start-ht.start);let rt=0;for(let wt=1;wt<st.length;wt++){let ht=st[rt],at=st[wt],Tt=ht.start+ht.count,It=J(at.start,x.width,4),Nt=J(ht.start,x.width,4);at.start<=Tt+1&&It===Nt&&J(at.start+at.count-1,x.width,4)===It?ht.count=Math.max(ht.count,at.start+at.count-ht.start):(++rt,st[rt]=at)}st.length=rt+1;let $=e.getParameter(s.UNPACK_ROW_LENGTH),Q=e.getParameter(s.UNPACK_SKIP_PIXELS),ot=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,x.width);for(let wt=0,ht=st.length;wt<ht;wt++){let at=st[wt],Tt=Math.floor(at.start/4),It=Math.ceil(at.count/4),Nt=Tt%x.width,N=Math.floor(Tt/x.width),lt=It,K=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Nt),e.pixelStorei(s.UNPACK_SKIP_ROWS,N),e.texSubImage2D(s.TEXTURE_2D,0,Nt,N,lt,K,O,G,x.data)}C.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,$),e.pixelStorei(s.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(s.UNPACK_SKIP_ROWS,ot)}}function vt(C,x,O){let G=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(G=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(G=s.TEXTURE_3D);let Z=Jt(C,x),st=x.source;e.bindTexture(G,C.__webglTexture,s.TEXTURE0+O);let rt=i.get(st);if(st.version!==rt.__version||Z===!0){if(e.activeTexture(s.TEXTURE0+O),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let K=Gt.getPrimaries(Gt.workingColorSpace),ct=x.colorSpace===Yi?null:Gt.getPrimaries(x.colorSpace),pt=x.colorSpace===Yi||K===ct?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}e.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment);let Q=m(x.image,!1,n.maxTextureSize);Q=Le(x,Q);let ot=r.convert(x.format,x.colorSpace),wt=r.convert(x.type),ht=y(x.internalFormat,ot,wt,x.normalized,x.colorSpace,x.isVideoTexture);qt(G,x);let at,Tt=x.mipmaps,It=x.isVideoTexture!==!0,Nt=rt.__version===void 0||Z===!0,N=st.dataReady,lt=w(x,Q);if(x.isDepthTexture)ht=b(x.format===pn,x.type),Nt&&(It?e.texStorage2D(s.TEXTURE_2D,1,ht,Q.width,Q.height):e.texImage2D(s.TEXTURE_2D,0,ht,Q.width,Q.height,0,ot,wt,null));else if(x.isDataTexture)if(Tt.length>0){It&&Nt&&e.texStorage2D(s.TEXTURE_2D,lt,ht,Tt[0].width,Tt[0].height);for(let K=0,ct=Tt.length;K<ct;K++)at=Tt[K],It?N&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,at.width,at.height,ot,wt,at.data):e.texImage2D(s.TEXTURE_2D,K,ht,at.width,at.height,0,ot,wt,at.data);x.generateMipmaps=!1}else It?(Nt&&e.texStorage2D(s.TEXTURE_2D,lt,ht,Q.width,Q.height),N&&tt(x,Q,ot,wt)):e.texImage2D(s.TEXTURE_2D,0,ht,Q.width,Q.height,0,ot,wt,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){It&&Nt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,lt,ht,Tt[0].width,Tt[0].height,Q.depth);for(let K=0,ct=Tt.length;K<ct;K++)if(at=Tt[K],x.format!==si)if(ot!==null)if(It){if(N)if(x.layerUpdates.size>0){let pt=gc(at.width,at.height,x.format,x.type);for(let nt of x.layerUpdates){let At=at.data.subarray(nt*pt/at.data.BYTES_PER_ELEMENT,(nt+1)*pt/at.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,nt,at.width,at.height,1,ot,At)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,at.width,at.height,Q.depth,ot,at.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,K,ht,at.width,at.height,Q.depth,0,at.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else It?N&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,at.width,at.height,Q.depth,ot,wt,at.data):e.texImage3D(s.TEXTURE_2D_ARRAY,K,ht,at.width,at.height,Q.depth,0,ot,wt,at.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{It&&Nt&&e.texStorage2D(s.TEXTURE_2D,lt,ht,Tt[0].width,Tt[0].height);for(let K=0,ct=Tt.length;K<ct;K++)at=Tt[K],x.format!==si?ot!==null?It?N&&e.compressedTexSubImage2D(s.TEXTURE_2D,K,0,0,at.width,at.height,ot,at.data):e.compressedTexImage2D(s.TEXTURE_2D,K,ht,at.width,at.height,0,at.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):It?N&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,at.width,at.height,ot,wt,at.data):e.texImage2D(s.TEXTURE_2D,K,ht,at.width,at.height,0,ot,wt,at.data)}else if(x.isDataArrayTexture)if(It){if(Nt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,lt,ht,Q.width,Q.height,Q.depth),N)if(x.layerUpdates.size>0){let K=gc(Q.width,Q.height,x.format,x.type);for(let ct of x.layerUpdates){let pt=Q.data.subarray(ct*K/Q.data.BYTES_PER_ELEMENT,(ct+1)*K/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ct,Q.width,Q.height,1,ot,wt,pt)}x.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ot,wt,Q.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,ht,Q.width,Q.height,Q.depth,0,ot,wt,Q.data);else if(x.isData3DTexture)It?(Nt&&e.texStorage3D(s.TEXTURE_3D,lt,ht,Q.width,Q.height,Q.depth),N&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ot,wt,Q.data)):e.texImage3D(s.TEXTURE_3D,0,ht,Q.width,Q.height,Q.depth,0,ot,wt,Q.data);else if(x.isFramebufferTexture){if(Nt)if(It)e.texStorage2D(s.TEXTURE_2D,lt,ht,Q.width,Q.height);else{let K=Q.width,ct=Q.height;for(let pt=0;pt<lt;pt++)e.texImage2D(s.TEXTURE_2D,pt,ht,K,ct,0,ot,wt,null),K>>=1,ct>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in s){let K=s.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),Q.parentNode!==K){K.appendChild(Q),f.add(x),K.onpaint=ct=>{let pt=ct.changedElements;for(let nt of f)pt.includes(nt.image)&&(nt.needsUpdate=!0)},K.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Q);else{let pt=s.RGBA,nt=s.RGBA,At=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,pt,nt,At,Q)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Tt.length>0){if(It&&Nt){let K=te(Tt[0]);e.texStorage2D(s.TEXTURE_2D,lt,ht,K.width,K.height)}for(let K=0,ct=Tt.length;K<ct;K++)at=Tt[K],It?N&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,ot,wt,at):e.texImage2D(s.TEXTURE_2D,K,ht,ot,wt,at);x.generateMipmaps=!1}else if(It){if(Nt){let K=te(Q);e.texStorage2D(s.TEXTURE_2D,lt,ht,K.width,K.height)}N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ot,wt,Q)}else e.texImage2D(s.TEXTURE_2D,0,ht,ot,wt,Q);p(x)&&S(G),rt.__version=st.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function Dt(C,x,O){if(x.image.length!==6)return;let G=Jt(C,x),Z=x.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+O);let st=i.get(Z);if(Z.version!==st.__version||G===!0){e.activeTexture(s.TEXTURE0+O);let rt=Gt.getPrimaries(Gt.workingColorSpace),$=x.colorSpace===Yi?null:Gt.getPrimaries(x.colorSpace),Q=x.colorSpace===Yi||rt===$?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let ot=x.isCompressedTexture||x.image[0].isCompressedTexture,wt=x.image[0]&&x.image[0].isDataTexture,ht=[];for(let nt=0;nt<6;nt++)!ot&&!wt?ht[nt]=m(x.image[nt],!0,n.maxCubemapSize):ht[nt]=wt?x.image[nt].image:x.image[nt],ht[nt]=Le(x,ht[nt]);let at=ht[0],Tt=r.convert(x.format,x.colorSpace),It=r.convert(x.type),Nt=y(x.internalFormat,Tt,It,x.normalized,x.colorSpace),N=x.isVideoTexture!==!0,lt=st.__version===void 0||G===!0,K=Z.dataReady,ct=w(x,at);qt(s.TEXTURE_CUBE_MAP,x);let pt;if(ot){N&&lt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Nt,at.width,at.height);for(let nt=0;nt<6;nt++){pt=ht[nt].mipmaps;for(let At=0;At<pt.length;At++){let St=pt[At];x.format!==si?Tt!==null?N?K&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,At,0,0,St.width,St.height,Tt,St.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,At,Nt,St.width,St.height,0,St.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,At,0,0,St.width,St.height,Tt,It,St.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,At,Nt,St.width,St.height,0,Tt,It,St.data)}}}else{if(pt=x.mipmaps,N&&lt){pt.length>0&&ct++;let nt=te(ht[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Nt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(wt){N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,ht[nt].width,ht[nt].height,Tt,It,ht[nt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Nt,ht[nt].width,ht[nt].height,0,Tt,It,ht[nt].data);for(let At=0;At<pt.length;At++){let le=pt[At].image[nt].image;N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,At+1,0,0,le.width,le.height,Tt,It,le.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,At+1,Nt,le.width,le.height,0,Tt,It,le.data)}}else{N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Tt,It,ht[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Nt,Tt,It,ht[nt]);for(let At=0;At<pt.length;At++){let St=pt[At];N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,At+1,0,0,Tt,It,St.image[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,At+1,Nt,Tt,It,St.image[nt])}}}p(x)&&S(s.TEXTURE_CUBE_MAP),st.__version=Z.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function _t(C,x,O,G,Z,st){let rt=r.convert(O.format,O.colorSpace),$=r.convert(O.type),Q=y(O.internalFormat,rt,$,O.normalized,O.colorSpace),ot=i.get(x),wt=i.get(O);if(wt.__renderTarget=x,!ot.__hasExternalTextures){let ht=Math.max(1,x.width>>st),at=Math.max(1,x.height>>st);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?e.texImage3D(Z,st,Q,ht,at,x.depth,0,rt,$,null):e.texImage2D(Z,st,Q,ht,at,0,rt,$,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),ge(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,G,Z,wt.__webglTexture,0,de(x)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,G,Z,wt.__webglTexture,st),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ot(C,x,O){if(s.bindRenderbuffer(s.RENDERBUFFER,C),x.depthBuffer){let G=x.depthTexture,Z=G&&G.isDepthTexture?G.type:null,st=b(x.stencilBuffer,Z),rt=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;ge(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,de(x),st,x.width,x.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,de(x),st,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,st,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,rt,s.RENDERBUFFER,C)}else{let G=x.textures;for(let Z=0;Z<G.length;Z++){let st=G[Z],rt=r.convert(st.format,st.colorSpace),$=r.convert(st.type),Q=y(st.internalFormat,rt,$,st.normalized,st.colorSpace);ge(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,de(x),Q,x.width,x.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,de(x),Q,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,Q,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Me(C,x,O){let G=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=i.get(x.depthTexture);if(Z.__renderTarget=x,(!Z.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),Z.__webglTexture===void 0){Z.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),qt(s.TEXTURE_CUBE_MAP,x.depthTexture);let ot=r.convert(x.depthTexture.format),wt=r.convert(x.depthTexture.type),ht;x.depthTexture.format===Ci?ht=s.DEPTH_COMPONENT24:x.depthTexture.format===pn&&(ht=s.DEPTH24_STENCIL8);for(let at=0;at<6;at++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,ht,x.width,x.height,0,ot,wt,null)}}else it(x.depthTexture,0);let st=Z.__webglTexture,rt=de(x),$=G?s.TEXTURE_CUBE_MAP_POSITIVE_X+O:s.TEXTURE_2D,Q=x.depthTexture.format===pn?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(x.depthTexture.format===Ci)ge(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,$,st,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,Q,$,st,0);else if(x.depthTexture.format===pn)ge(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,$,st,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,Q,$,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function zt(C){let x=i.get(C),O=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){let G=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),G){let Z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,G.removeEventListener("dispose",Z)};G.addEventListener("dispose",Z),x.__depthDisposeCallback=Z}x.__boundDepthTexture=G}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let G=0;G<6;G++)Me(x.__webglFramebuffer[G],C,G);else{let G=C.texture.mipmaps;G&&G.length>0?Me(x.__webglFramebuffer[0],C,0):Me(x.__webglFramebuffer,C,0)}else if(O){x.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[G]),x.__webglDepthbuffer[G]===void 0)x.__webglDepthbuffer[G]=s.createRenderbuffer(),Ot(x.__webglDepthbuffer[G],C,!1);else{let Z=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=x.__webglDepthbuffer[G];s.bindRenderbuffer(s.RENDERBUFFER,st),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,st)}}else{let G=C.texture.mipmaps;if(G&&G.length>0?e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),Ot(x.__webglDepthbuffer,C,!1);else{let Z=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,st),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,st)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Zt(C,x,O){let G=i.get(C);x!==void 0&&_t(G.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&zt(C)}function ae(C){let x=C.texture,O=i.get(C),G=i.get(x);C.addEventListener("dispose",v);let Z=C.textures,st=C.isWebGLCubeRenderTarget===!0,rt=Z.length>1;if(rt||(G.__webglTexture===void 0&&(G.__webglTexture=s.createTexture()),G.__version=x.version,o.memory.textures++),st){O.__webglFramebuffer=[];for(let $=0;$<6;$++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[$]=[];for(let Q=0;Q<x.mipmaps.length;Q++)O.__webglFramebuffer[$][Q]=s.createFramebuffer()}else O.__webglFramebuffer[$]=s.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let $=0;$<x.mipmaps.length;$++)O.__webglFramebuffer[$]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(rt)for(let $=0,Q=Z.length;$<Q;$++){let ot=i.get(Z[$]);ot.__webglTexture===void 0&&(ot.__webglTexture=s.createTexture(),o.memory.textures++)}if(C.samples>0&&ge(C)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let $=0;$<Z.length;$++){let Q=Z[$];O.__webglColorRenderbuffer[$]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[$]);let ot=r.convert(Q.format,Q.colorSpace),wt=r.convert(Q.type),ht=y(Q.internalFormat,ot,wt,Q.normalized,Q.colorSpace,C.isXRRenderTarget===!0),at=de(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,at,ht,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$,s.RENDERBUFFER,O.__webglColorRenderbuffer[$])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),Ot(O.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(st){e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture),qt(s.TEXTURE_CUBE_MAP,x);for(let $=0;$<6;$++)if(x.mipmaps&&x.mipmaps.length>0)for(let Q=0;Q<x.mipmaps.length;Q++)_t(O.__webglFramebuffer[$][Q],C,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Q);else _t(O.__webglFramebuffer[$],C,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);p(x)&&S(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let $=0,Q=Z.length;$<Q;$++){let ot=Z[$],wt=i.get(ot),ht=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ht=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,wt.__webglTexture),qt(ht,ot),_t(O.__webglFramebuffer,C,ot,s.COLOR_ATTACHMENT0+$,ht,0),p(ot)&&S(ht)}e.unbindTexture()}else{let $=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&($=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture($,G.__webglTexture),qt($,x),x.mipmaps&&x.mipmaps.length>0)for(let Q=0;Q<x.mipmaps.length;Q++)_t(O.__webglFramebuffer[Q],C,x,s.COLOR_ATTACHMENT0,$,Q);else _t(O.__webglFramebuffer,C,x,s.COLOR_ATTACHMENT0,$,0);p(x)&&S($),e.unbindTexture()}C.depthBuffer&&zt(C)}function Ht(C){let x=C.textures;for(let O=0,G=x.length;O<G;O++){let Z=x[O];if(p(Z)){let st=E(C),rt=i.get(Z).__webglTexture;e.bindTexture(st,rt),S(st),e.unbindTexture()}}}let fe=[],Ee=[];function Ge(C){if(C.samples>0){if(ge(C)===!1){let x=C.textures,O=C.width,G=C.height,Z=s.COLOR_BUFFER_BIT,st=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,rt=i.get(C),$=x.length>1;if($)for(let ot=0;ot<x.length;ot++)e.bindFramebuffer(s.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,rt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer);let Q=C.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,rt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let ot=0;ot<x.length;ot++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),$){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,rt.__webglColorRenderbuffer[ot]);let wt=i.get(x[ot]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,wt,0)}s.blitFramebuffer(0,0,O,G,0,0,O,G,Z,s.NEAREST),l===!0&&(fe.length=0,Ee.length=0,fe.push(s.COLOR_ATTACHMENT0+ot),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(fe.push(st),Ee.push(st),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ee)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),$)for(let ot=0;ot<x.length;ot++){e.bindFramebuffer(s.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.RENDERBUFFER,rt.__webglColorRenderbuffer[ot]);let wt=i.get(x[ot]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,rt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.TEXTURE_2D,wt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let x=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function de(C){return Math.min(n.maxSamples,C.samples)}function ge(C){let x=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function U(C){let x=o.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function Le(C,x){let O=C.colorSpace,G=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||O!==Bs&&O!==Yi&&(Gt.getTransfer(O)===Qt?(G!==si||Z!==ni)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pt("WebGLTextures: Unsupported texture color space:",O)),x}function te(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=B,this.getTextureUnits=P,this.setTextureUnits=z,this.setTexture2D=it,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=et,this.rebindTextures=Zt,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=ge,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function L_(s,t){function e(i,n=Yi){let r,o=Gt.getTransfer(n);if(i===ni)return s.UNSIGNED_BYTE;if(i===zo)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Vo)return s.UNSIGNED_SHORT_5_5_5_1;if(i===rc)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===oc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===nc)return s.BYTE;if(i===sc)return s.SHORT;if(i===ds)return s.UNSIGNED_SHORT;if(i===ko)return s.INT;if(i===vi)return s.UNSIGNED_INT;if(i===li)return s.FLOAT;if(i===yi)return s.HALF_FLOAT;if(i===ac)return s.ALPHA;if(i===lc)return s.RGB;if(i===si)return s.RGBA;if(i===Ci)return s.DEPTH_COMPONENT;if(i===pn)return s.DEPTH_STENCIL;if(i===cc)return s.RED;if(i===Ho)return s.RED_INTEGER;if(i===mn)return s.RG;if(i===Go)return s.RG_INTEGER;if(i===Wo)return s.RGBA_INTEGER;if(i===rr||i===or||i===ar||i===lr)if(o===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xo||i===qo||i===Yo||i===Zo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Jo||i===$o||i===Ko||i===Qo||i===jo||i===cr||i===ta)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Jo||i===$o)return o===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ko)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Qo)return r.COMPRESSED_R11_EAC;if(i===jo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===cr)return r.COMPRESSED_RG11_EAC;if(i===ta)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ea||i===ia||i===na||i===sa||i===ra||i===oa||i===aa||i===la||i===ca||i===ha||i===ua||i===fa||i===da||i===pa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ea)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ia)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===na)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===sa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ra)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===oa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===aa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===la)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ca)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ha)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ua)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===fa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===da)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===pa)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ma||i===ga||i===_a)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ma)return o===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ga)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_a)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xa||i===va||i===hr||i===ya)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===xa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===va)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===hr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ya)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ps?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var D_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,N_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ic=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Ks(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new ei({vertexShader:D_,fragmentShader:N_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ti(new Qs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Pc=class extends Ri{constructor(t,e){super();let i=this,n=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null,_=typeof XRWebGLBinding<"u",m=new Ic,p={},S=e.getContextAttributes(),E=null,y=null,b=[],w=[],R=new Ft,v=null,T=null,I=new Xe;I.viewport=new ne;let L=new Xe;L.viewport=new ne;let F=[I,L],B=new Uo,P=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let tt=b[J];return tt===void 0&&(tt=new ls,b[J]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(J){let tt=b[J];return tt===void 0&&(tt=new ls,b[J]=tt),tt.getGripSpace()},this.getHand=function(J){let tt=b[J];return tt===void 0&&(tt=new ls,b[J]=tt),tt.getHandSpace()};function Y(J){let tt=w.indexOf(J.inputSource);if(tt===-1)return;let vt=b[tt];vt!==void 0&&(vt.update(J.inputSource,J.frame,c||o),vt.dispatchEvent({type:J.type,data:J.inputSource}))}function q(){n.removeEventListener("select",Y),n.removeEventListener("selectstart",Y),n.removeEventListener("selectend",Y),n.removeEventListener("squeeze",Y),n.removeEventListener("squeezestart",Y),n.removeEventListener("squeezeend",Y),n.removeEventListener("end",q),n.removeEventListener("inputsourceschange",it);for(let J=0;J<b.length;J++){let tt=w[J];tt!==null&&(w[J]=null,b[J].disconnect(tt))}P=null,z=null,m.reset();for(let J in p)delete p[J];if(t.setRenderTarget(E),d=null,u=null,f=null,n=null,y=null,Jt.stop(),i.isPresenting=!1,t.setPixelRatio(v),t.setSize(R.width,R.height,!1),T!==null){let J=T.camera;J.fov=T.fov,J.zoom=T.zoom,J.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,i.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(n,e)),f},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(J){if(n=J,n!==null){if(E=t.getRenderTarget(),n.addEventListener("select",Y),n.addEventListener("selectstart",Y),n.addEventListener("selectend",Y),n.addEventListener("squeeze",Y),n.addEventListener("squeezestart",Y),n.addEventListener("squeezeend",Y),n.addEventListener("end",q),n.addEventListener("inputsourceschange",it),S.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let vt=null,Dt=null,_t=null;S.depth&&(_t=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=S.stencil?pn:Ci,Dt=S.stencil?ps:vi);let Ot={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Ot),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Ye(u.textureWidth,u.textureHeight,{format:si,type:ni,depthTexture:new an(u.textureWidth,u.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let vt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(n,e,vt),n.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Ye(d.framebufferWidth,d.framebufferHeight,{format:si,type:ni,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await n.requestReferenceSpace(a),Jt.setContext(n),Jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function it(J){for(let tt=0;tt<J.removed.length;tt++){let vt=J.removed[tt],Dt=w.indexOf(vt);Dt>=0&&(w[Dt]=null,b[Dt].disconnect(vt))}for(let tt=0;tt<J.added.length;tt++){let vt=J.added[tt],Dt=w.indexOf(vt);if(Dt===-1){for(let Ot=0;Ot<b.length;Ot++)if(Ot>=w.length){w.push(vt),Dt=Ot;break}else if(w[Ot]===null){w[Ot]=vt,Dt=Ot;break}if(Dt===-1)break}let _t=b[Dt];_t&&_t.connect(vt)}}let X=new k,j=new k;function et(J,tt,vt){X.setFromMatrixPosition(tt.matrixWorld),j.setFromMatrixPosition(vt.matrixWorld);let Dt=X.distanceTo(j),_t=tt.projectionMatrix.elements,Ot=vt.projectionMatrix.elements,Me=_t[14]/(_t[10]-1),zt=_t[14]/(_t[10]+1),Zt=(_t[9]+1)/_t[5],ae=(_t[9]-1)/_t[5],Ht=(_t[8]-1)/_t[0],fe=(Ot[8]+1)/Ot[0],Ee=Me*Ht,Ge=Me*fe,de=Dt/(-Ht+fe),ge=de*-Ht;if(tt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ge),J.translateZ(de),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),_t[10]===-1)J.projectionMatrix.copy(tt.projectionMatrix),J.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let U=Me+de,Le=zt+de,te=Ee-ge,C=Ge+(Dt-ge),x=Zt*zt/Le*U,O=ae*zt/Le*U;J.projectionMatrix.makePerspective(te,C,x,O,U,Le),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Ct(J,tt){tt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(tt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(n===null)return;let tt=J.near,vt=J.far;m.texture!==null&&(m.depthNear>0&&(tt=m.depthNear),m.depthFar>0&&(vt=m.depthFar)),B.near=L.near=I.near=tt,B.far=L.far=I.far=vt,(P!==B.near||z!==B.far)&&(n.updateRenderState({depthNear:B.near,depthFar:B.far}),P=B.near,z=B.far),B.layers.mask=J.layers.mask|6,I.layers.mask=B.layers.mask&-5,L.layers.mask=B.layers.mask&-3;let Dt=J.parent,_t=B.cameras;Ct(B,Dt);for(let Ot=0;Ot<_t.length;Ot++)Ct(_t[Ot],Dt);_t.length===2?et(B,I,L):B.projectionMatrix.copy(I.projectionMatrix),T===null&&J.isPerspectiveCamera&&(T={camera:J,fov:J.fov,zoom:J.zoom}),Et(J,B,Dt)};function Et(J,tt,vt){vt===null?J.matrix.copy(tt.matrixWorld):(J.matrix.copy(vt.matrixWorld),J.matrix.invert(),J.matrix.multiply(tt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(tt.projectionMatrix),J.projectionMatrixInverse.copy(tt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=lo*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(J){return p[J]};let oe=null;function qt(J,tt){if(h=tt.getViewerPose(c||o),g=tt,h!==null){let vt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let Dt=!1;vt.length!==B.cameras.length&&(B.cameras.length=0,Dt=!0);for(let zt=0;zt<vt.length;zt++){let Zt=vt[zt],ae=null;if(d!==null)ae=d.getViewport(Zt);else{let fe=f.getViewSubImage(u,Zt);ae=fe.viewport,zt===0&&(t.setRenderTargetTextures(y,fe.colorTexture,fe.depthStencilTexture),t.setRenderTarget(y))}let Ht=F[zt];Ht===void 0&&(Ht=new Xe,Ht.layers.enable(zt),Ht.viewport=new ne,F[zt]=Ht),Ht.matrix.fromArray(Zt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(Zt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(ae.x,ae.y,ae.width,ae.height),zt===0&&(B.matrix.copy(Ht.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Dt===!0&&B.cameras.push(Ht)}let _t=n.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&_){f=i.getBinding();let zt=f.getDepthInformation(vt[0]);zt&&zt.isValid&&zt.texture&&m.init(zt,n.renderState)}if(_t&&_t.includes("camera-access")&&_){t.state.unbindTexture(),f=i.getBinding();for(let zt=0;zt<vt.length;zt++){let Zt=vt[zt].camera;if(Zt){let ae=p[Zt];ae||(ae=new Ks,p[Zt]=ae);let Ht=f.getCameraImage(Zt);ae.sourceTexture=Ht}}}}for(let vt=0;vt<b.length;vt++){let Dt=w[vt],_t=b[vt];Dt!==null&&_t!==void 0&&_t.update(Dt,tt,c||o)}oe&&oe(J,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),g=null}let Jt=new rf;Jt.setAnimationLoop(qt),this.setAnimationLoop=function(J){oe=J},this.dispose=function(){}}},U_=new kt,uf=new Lt;uf.set(-1,0,0,0,1,0,0,0,1);function F_(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,dc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,S,E,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===He&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===He&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=t.get(p),E=S.envMap,y=S.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(U_.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(uf),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===He&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function B_(s,t,e,i){let n={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,b){let w=b.program;i.uniformBlockBinding(y,w)}function c(y,b){let w=n[y.id];w===void 0&&(m(y),w=h(y),n[y.id]=w,y.addEventListener("dispose",S));let R=b.program;i.updateUBOMapping(y,R);let v=t.render.frame;r[y.id]!==v&&(u(y),r[y.id]=v)}function h(y){let b=f();y.__bindingPointIndex=b;let w=s.createBuffer(),R=y.__size,v=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,R,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,w),w}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return Pt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let b=n[y.id],w=y.uniforms,R=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let v=0,T=w.length;v<T;v++){let I=w[v];if(Array.isArray(I))for(let L=0,F=I.length;L<F;L++)d(I[L],v,L,R);else d(I,v,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(y,b,w,R){if(_(y,b,w,R)===!0){let v=y.__offset,T=y.value;if(Array.isArray(T)){let I=0;for(let L=0;L<T.length;L++){let F=T[L],B=p(F);g(F,y.__data,I),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(I+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,y.__data)}}function g(y,b,w){typeof y=="number"||typeof y=="boolean"?b[0]=y:y.isMatrix3?(b[0]=y.elements[0],b[1]=y.elements[1],b[2]=y.elements[2],b[3]=0,b[4]=y.elements[3],b[5]=y.elements[4],b[6]=y.elements[5],b[7]=0,b[8]=y.elements[6],b[9]=y.elements[7],b[10]=y.elements[8],b[11]=0):ArrayBuffer.isView(y)?b.set(new y.constructor(y.buffer,y.byteOffset,b.length)):y.toArray(b,w)}function _(y,b,w,R){let v=y.value,T=b+"_"+w;if(R[T]===void 0)return typeof v=="number"||typeof v=="boolean"?R[T]=v:ArrayBuffer.isView(v)?R[T]=v.slice():R[T]=v.clone(),!0;{let I=R[T];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return R[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function m(y){let b=y.uniforms,w=0,R=16;for(let T=0,I=b.length;T<I;T++){let L=Array.isArray(b[T])?b[T]:[b[T]];for(let F=0,B=L.length;F<B;F++){let P=L[F],z=Array.isArray(P.value)?P.value:[P.value];for(let Y=0,q=z.length;Y<q;Y++){let it=z[Y],X=p(it),j=w%R,et=j%X.boundary,Ct=j+et;w+=et,Ct!==0&&R-Ct<X.storage&&(w+=R-Ct),P.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=w,w+=X.storage}}}let v=w%R;return v>0&&(w+=R-v),y.__size=w,y.__cache={},this}function p(y){let b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(b.boundary=16,b.storage=y.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",y),b}function S(y){let b=y.target;b.removeEventListener("dispose",S);let w=o.indexOf(b.__bindingPointIndex);o.splice(w,1),s.deleteBuffer(n[b.id]),delete n[b.id],delete r[b.id]}function E(){for(let y in n)s.deleteBuffer(n[y]);o=[],n={},r={}}return{bind:l,update:c,dispose:E}}var O_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Di=null;function k_(){return Di===null&&(Di=new Zs(O_,16,16,mn,yi),Di.name="DFG_LUT",Di.minFilter=Pe,Di.magFilter=Pe,Di.wrapS=Ai,Di.wrapT=Ai,Di.generateMipmaps=!1,Di.needsUpdate=!0),Di}var sf=class{constructor(t={}){let{canvas:e=Au(),context:i=null,depth:n=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=ni}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;let _=d,m=new Set([Wo,Go,Ho]),p=new Set([ni,vi,ds,ps,zo,Vo]),S=new Uint32Array(4),E=new Int32Array(4),y=new k,b=null,w=null,R=[],v=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,L=!1,F=null,B=null,P=null,z=null;this._outputColorSpace=je;let Y=0,q=0,it=null,X=-1,j=null,et=new ne,Ct=new ne,Et=null,oe=new Wt(0),qt=0,Jt=e.width,J=e.height,tt=1,vt=null,Dt=null,_t=new ne(0,0,Jt,J),Ot=new ne(0,0,Jt,J),Me=!1,zt=new Js,Zt=!1,ae=!1,Ht=new kt,fe=new k,Ee=new ne,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},de=!1;function ge(){return it===null?tt:1}let U=i;function Le(M,D){return e.getContext(M,D)}let te,C,x,O,G,Z,st,rt,$,Q,ot,wt,ht,at,Tt,It,Nt,N,lt,K,ct,pt,nt;try{let M={alpha:!0,depth:n,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",le,!1),e.addEventListener("webglcontextrestored",$t,!1),e.addEventListener("webglcontextcreationerror",hi,!1),U===null){let D="webgl2";if(U=Le(D,M),U===null)throw Le(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}At()}catch(M){throw e.removeEventListener("webglcontextlost",le,!1),e.removeEventListener("webglcontextrestored",$t,!1),e.removeEventListener("webglcontextcreationerror",hi,!1),Pt("WebGLRenderer: "+M.message),M}function At(){te=new qg(U),te.init(),ct=new L_(U,te),C=new Fg(U,te,t,ct),x=new I_(U,te),C.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),B=U.createFramebuffer(),P=U.createFramebuffer(),z=U.createFramebuffer(),O=new Jg(U),G=new g_,Z=new P_(U,te,x,G,C,ct,O),st=new Xg(I),rt=new Kd(U),pt=new Ng(U,rt),$=new Yg(U,rt,O,pt),Q=new Kg(U,$,rt,pt,O),N=new $g(U,C,Z),Tt=new Bg(G),ot=new m_(I,st,te,C,pt,Tt),wt=new F_(I,G),ht=new x_,at=new w_(te),Nt=new Dg(I,st,x,Q,g,l),It=new R_(I,Q,C),nt=new B_(U,O,C,x),lt=new Ug(U,te,O),K=new Zg(U,te,O),O.programs=ot.programs,I.capabilities=C,I.extensions=te,I.properties=G,I.renderLists=ht,I.shadowMap=It,I.state=x,I.info=O}_!==ni&&(T=new jg(_,e.width,e.height,a,n,r));let St=new Pc(I,U);this.xr=St,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let M=te.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=te.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(M){M!==void 0&&(tt=M,this.setSize(Jt,J,!1))},this.getSize=function(M){return M.set(Jt,J)},this.setSize=function(M,D,W=!0){if(St.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}Jt=M,J=D,e.width=Math.floor(M*tt),e.height=Math.floor(D*tt),W===!0&&(e.style.width=M+"px",e.style.height=D+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(Jt*tt,J*tt).floor()},this.setDrawingBufferSize=function(M,D,W){Jt=M,J=D,tt=W,e.width=Math.floor(M*W),e.height=Math.floor(D*W),this.setViewport(0,0,M,D)},this.setEffects=function(M){if(_===ni){Pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let D=0;D<M.length;D++)if(M[D].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(et)},this.getViewport=function(M){return M.copy(_t)},this.setViewport=function(M,D,W,V){M.isVector4?_t.set(M.x,M.y,M.z,M.w):_t.set(M,D,W,V),x.viewport(et.copy(_t).multiplyScalar(tt).round())},this.getScissor=function(M){return M.copy(Ot)},this.setScissor=function(M,D,W,V){M.isVector4?Ot.set(M.x,M.y,M.z,M.w):Ot.set(M,D,W,V),x.scissor(Ct.copy(Ot).multiplyScalar(tt).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(M){x.setScissorTest(Me=M)},this.setOpaqueSort=function(M){vt=M},this.setTransparentSort=function(M){Dt=M},this.getClearColor=function(M){return M.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(M=!0,D=!0,W=!0){let V=0;if(M){let H=!1;if(it!==null){let dt=it.texture.format;H=m.has(dt)}if(H){let dt=it.texture.type,xt=p.has(dt),ft=Nt.getClearColor(),yt=Nt.getClearAlpha(),bt=ft.r,Ut=ft.g,Vt=ft.b;xt?(S[0]=bt,S[1]=Ut,S[2]=Vt,S[3]=yt,U.clearBufferuiv(U.COLOR,0,S)):(E[0]=bt,E[1]=Ut,E[2]=Vt,E[3]=yt,U.clearBufferiv(U.COLOR,0,E))}else V|=U.COLOR_BUFFER_BIT}D&&(V|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(V|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&U.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){e.removeEventListener("webglcontextlost",le,!1),e.removeEventListener("webglcontextrestored",$t,!1),e.removeEventListener("webglcontextcreationerror",hi,!1),Nt.dispose(),ht.dispose(),at.dispose(),G.dispose(),st.dispose(),Q.dispose(),pt.dispose(),nt.dispose(),ot.dispose(),St.dispose(),St.removeEventListener("sessionstart",qc),St.removeEventListener("sessionend",Yc),yn.stop()};function le(M){M.preventDefault(),Vs("WebGLRenderer: Context Lost."),L=!0}function $t(){Vs("WebGLRenderer: Context Restored."),L=!1;let M=O.autoReset,D=It.enabled,W=It.autoUpdate,V=It.needsUpdate,H=It.type;At(),O.autoReset=M,It.enabled=D,It.autoUpdate=W,It.needsUpdate=V,It.type=H}function hi(M){Pt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Si(M){let D=M.target;D.removeEventListener("dispose",Si),Hf(D)}function Hf(M){Gf(M),G.remove(M)}function Gf(M){let D=G.get(M).programs;D!==void 0&&(D.forEach(function(W){ot.releaseProgram(W)}),M.isShaderMaterial&&ot.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,W,V,H,dt){D===null&&(D=Ge);let xt=H.isMesh&&H.matrixWorld.determinantAffine()<0,ft=qf(M,D,W,V,H);x.setMaterial(V,xt);let yt=W.index,bt=1;if(V.wireframe===!0){if(yt=$.getWireframeAttribute(W),yt===void 0)return;bt=2}let Ut=W.drawRange,Vt=W.attributes.position,Mt=Ut.start*bt,Kt=(Ut.start+Ut.count)*bt;dt!==null&&(Mt=Math.max(Mt,dt.start*bt),Kt=Math.min(Kt,(dt.start+dt.count)*bt)),yt!==null?(Mt=Math.max(Mt,0),Kt=Math.min(Kt,yt.count)):Vt!=null&&(Mt=Math.max(Mt,0),Kt=Math.min(Kt,Vt.count));let _e=Kt-Mt;if(_e<0||_e===1/0)return;pt.setup(H,V,ft,W,yt);let he,se=lt;if(yt!==null&&(he=rt.get(yt),se=K,se.setIndex(he)),H.isMesh)V.wireframe===!0?(x.setLineWidth(V.wireframeLinewidth*ge()),se.setMode(U.LINES)):se.setMode(U.TRIANGLES);else if(H.isLine){let De=V.linewidth;De===void 0&&(De=1),x.setLineWidth(De*ge()),H.isLineSegments?se.setMode(U.LINES):H.isLineLoop?se.setMode(U.LINE_LOOP):se.setMode(U.LINE_STRIP)}else H.isPoints?se.setMode(U.POINTS):H.isSprite&&se.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(te.get("WEBGL_multi_draw"))se.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let De=H._multiDrawStarts,mt=H._multiDrawCounts,Be=H._multiDrawCount,Yt=yt?rt.get(yt).bytesPerElement:1,ri=G.get(V).currentProgram.getUniforms();for(let bi=0;bi<Be;bi++)ri.setValue(U,"_gl_DrawID",bi),se.render(De[bi]/Yt,mt[bi])}else if(H.isInstancedMesh)se.renderInstances(Mt,_e,H.count);else if(W.isInstancedBufferGeometry){let De=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,mt=Math.min(W.instanceCount,De);se.renderInstances(Mt,_e,mt)}else se.render(Mt,_e)};function Xc(M,D,W,V){F!==null&&M.isNodeMaterial&&F.setObject(V,M),Zt===!0&&Tt.setState(M,W,!1),M.transparent===!0&&M.side===Pi&&M.forceSinglePass===!1?(M.side=He,M.needsUpdate=!0,_r(M,D,V),M.side=un,M.needsUpdate=!0,_r(M,D,V),M.side=Pi):_r(M,D,V)}this.compile=function(M,D,W=null){W===null&&(W=M),F!==null&&F.renderStart(M,D,W),w=at.get(W),w.init(D),v.push(w),W.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(w.pushLight(H),H.castShadow&&w.pushShadow(H))}),M!==W&&M.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(w.pushLight(H),H.castShadow&&w.pushShadow(H))}),w.setupLights(),F!==null&&F.updateLights(w.state.lightsArray),ae=this.localClippingEnabled,Zt=Tt.init(this.clippingPlanes,ae),Zt===!0&&Tt.setGlobalState(this.clippingPlanes,D),F!==null&&It.render(w.state.shadowsArray,W,D);let V=new Set;return M.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let dt=H.material;if(dt)if(Array.isArray(dt))for(let xt=0;xt<dt.length;xt++){let ft=dt[xt];Xc(ft,W,D,H),V.add(ft)}else Xc(dt,W,D,H),V.add(dt)}),w=v.pop(),F!==null&&F.renderEnd(),V},this.compileAsync=function(M,D,W=null){let V=this.compile(M,D,W);return new Promise(H=>{function dt(){if(V.forEach(function(xt){let yt=G.get(xt).currentProgram;(yt===void 0||yt.isReady())&&V.delete(xt)}),V.size===0){H(M);return}setTimeout(dt,10)}te.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let ka=null;function Wf(M){ka&&ka(M)}function qc(){yn.stop()}function Yc(){yn.start()}let yn=new rf;yn.setAnimationLoop(Wf),typeof self<"u"&&yn.setContext(self),this.setAnimationLoop=function(M){ka=M,St.setAnimationLoop(M),M===null?yn.stop():yn.start()},St.addEventListener("sessionstart",qc),St.addEventListener("sessionend",Yc),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){Pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;F!==null&&F.renderStart(M,D);let W=St.enabled===!0&&St.isPresenting===!0,V=T!==null&&(it===null||W)&&T.begin(I,it);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),St.enabled===!0&&St.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(St.cameraAutoUpdate===!0&&St.updateCamera(D),D=St.getCamera()),M.isScene===!0&&M.onBeforeRender(I,M,D,it),w=at.get(M,v.length),w.init(D),w.state.textureUnits=Z.getTextureUnits(),v.push(w),Ht.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),zt.setFromProjectionMatrix(Ht,_i,D.reversedDepth),ae=this.localClippingEnabled,Zt=Tt.init(this.clippingPlanes,ae),b=ht.get(M,R.length),b.init(),R.push(b),St.enabled===!0&&St.isPresenting===!0){let xt=I.xr.getDepthSensingMesh();xt!==null&&za(xt,D,-1/0,I.sortObjects)}za(M,D,0,I.sortObjects),b.finish(),F!==null&&F.updateLights(w.state.lightsArray),I.sortObjects===!0&&b.sort(vt,Dt),de=St.enabled===!1||St.isPresenting===!1||St.hasDepthSensing()===!1,de&&Nt.addToRenderList(b,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Zt===!0&&Tt.beginShadows();let H=w.state.shadowsArray;if(It.render(H,M,D),Zt===!0&&Tt.endShadows(),(V&&T.hasRenderPass())===!1){let xt=b.opaque,ft=b.transmissive;if(w.setupLights(),D.isArrayCamera){let yt=D.cameras;if(ft.length>0)for(let bt=0,Ut=yt.length;bt<Ut;bt++){let Vt=yt[bt];Jc(xt,ft,M,Vt)}de&&Nt.render(M);for(let bt=0,Ut=yt.length;bt<Ut;bt++){let Vt=yt[bt];Zc(b,M,Vt,Vt.viewport)}}else ft.length>0&&Jc(xt,ft,M,D),de&&Nt.render(M),Zc(b,M,D)}it!==null&&q===0&&(Z.updateMultisampleRenderTarget(it),Z.updateRenderTargetMipmap(it)),V&&T.end(I),M.isScene===!0&&M.onAfterRender(I,M,D),pt.resetDefaultState(),X=-1,j=null,v.pop(),v.length>0?(w=v[v.length-1],Z.setTextureUnits(w.state.textureUnits),Zt===!0&&Tt.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?b=R[R.length-1]:b=null,F!==null&&F.renderEnd()};function za(M,D,W,V){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)W=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(zt)){V&&Ee.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ht);let xt=Q.update(M),ft=M.material;ft.visible&&b.push(M,xt,ft,W,Ee.z,null,D)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(zt))){let xt=Q.update(M),ft=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ee.copy(M.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Ee.copy(xt.boundingSphere.center)),Ee.applyMatrix4(M.matrixWorld).applyMatrix4(Ht)),Array.isArray(ft)){let yt=xt.groups;for(let bt=0,Ut=yt.length;bt<Ut;bt++){let Vt=yt[bt],Mt=ft[Vt.materialIndex];Mt&&Mt.visible&&b.push(M,xt,Mt,W,Ee.z,Vt,D)}}else ft.visible&&b.push(M,xt,ft,W,Ee.z,null,D)}}let dt=M.children;for(let xt=0,ft=dt.length;xt<ft;xt++)za(dt[xt],D,W,V)}function Zc(M,D,W,V){let{opaque:H,transmissive:dt,transparent:xt}=M;w.setupLightsView(W),Zt===!0&&Tt.setGlobalState(I.clippingPlanes,W),V&&x.viewport(et.copy(V)),H.length>0&&gr(H,D,W),dt.length>0&&gr(dt,D,W),xt.length>0&&gr(xt,D,W),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Jc(M,D,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[V.id]===void 0){let Mt=te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[V.id]=new Ye(1,1,{generateMipmaps:!0,type:Mt?yi:ni,minFilter:dn,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Gt.workingColorSpace})}let dt=w.state.transmissionRenderTarget[V.id],xt=V.viewport||et;dt.setSize(xt.z*I.transmissionResolutionScale,xt.w*I.transmissionResolutionScale);let ft=I.getRenderTarget(),yt=I.getActiveCubeFace(),bt=I.getActiveMipmapLevel();I.setRenderTarget(dt),I.getClearColor(oe),qt=I.getClearAlpha(),qt<1&&I.setClearColor(16777215,.5),I.clear(),de&&Nt.render(W);let Ut=I.toneMapping;I.toneMapping=xi;let Vt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),w.setupLightsView(V),Zt===!0&&Tt.setGlobalState(I.clippingPlanes,V),gr(M,W,V),Z.updateMultisampleRenderTarget(dt),Z.updateRenderTargetMipmap(dt),te.has("WEBGL_multisampled_render_to_texture")===!1){let Mt=!1;for(let Kt=0,_e=D.length;Kt<_e;Kt++){let he=D[Kt],{object:se,geometry:De,material:mt,group:Be}=he;if(mt.side===Pi&&se.layers.test(V.layers)){let Yt=mt.side;mt.side=He,mt.needsUpdate=!0,$c(se,W,V,De,mt,Be),mt.side=Yt,mt.needsUpdate=!0,Mt=!0}}Mt===!0&&(Z.updateMultisampleRenderTarget(dt),Z.updateRenderTargetMipmap(dt))}I.setRenderTarget(ft,yt,bt),I.setClearColor(oe,qt),Vt!==void 0&&(V.viewport=Vt),I.toneMapping=Ut}function gr(M,D,W){let V=D.isScene===!0?D.overrideMaterial:null;for(let H=0,dt=M.length;H<dt;H++){let xt=M[H],{object:ft,geometry:yt,group:bt}=xt,Ut=xt.material;Ut.allowOverride===!0&&V!==null&&(Ut=V),ft.layers.test(W.layers)&&$c(ft,D,W,yt,Ut,bt)}}function $c(M,D,W,V,H,dt){F!==null&&H.isNodeMaterial&&F.setObject(M,H),M.onBeforeRender(I,D,W,V,H,dt),M.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),H.onBeforeRender(I,D,W,V,M,dt),H.transparent===!0&&H.side===Pi&&H.forceSinglePass===!1?(H.side=He,H.needsUpdate=!0,I.renderBufferDirect(W,D,V,H,M,dt),H.side=un,H.needsUpdate=!0,I.renderBufferDirect(W,D,V,H,M,dt),H.side=Pi):I.renderBufferDirect(W,D,V,H,M,dt),M.onAfterRender(I,D,W,V,H,dt)}function _r(M,D,W){D.isScene!==!0&&(D=Ge);let V=G.get(M),H=w.state.lights,dt=w.state.shadowsArray,xt=H.state.version,ft=ot.getParameters(M,H.state,dt,D,W,w.state.lightProbeGridArray),yt=ot.getProgramCacheKey(ft),bt=V.programs;V.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?D.environment:null,V.fog=D.fog;let Ut=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;V.envMap=st.get(M.envMap||V.environment,Ut),V.envMapRotation=V.environment!==null&&M.envMap===null?D.environmentRotation:M.envMapRotation,bt===void 0&&(M.addEventListener("dispose",Si),bt=new Map,V.programs=bt);let Vt=bt.get(yt);if(Vt!==void 0){if(V.currentProgram===Vt&&V.lightsStateVersion===xt)return Qc(M,ft),Vt}else ft.uniforms=ot.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,W,ft),M.onBeforeCompile(ft,I),Vt=ot.acquireProgram(ft,yt),bt.set(yt,Vt),V.uniforms=ft.uniforms;let Mt=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Mt.clippingPlanes=Tt.uniform),Qc(M,ft),V.needsLights=Zf(M),V.lightsStateVersion=xt,V.needsLights&&(Mt.ambientLightColor.value=H.state.ambient,Mt.lightProbe.value=H.state.probe,Mt.sunLights.value=H.state.sun,Mt.sunLightShadows.value=H.state.sunShadow,Mt.directionalLights.value=H.state.directional,Mt.directionalLightShadows.value=H.state.directionalShadow,Mt.spotLights.value=H.state.spot,Mt.spotLightShadows.value=H.state.spotShadow,Mt.rectAreaLights.value=H.state.rectArea,Mt.ltc_1.value=H.state.rectAreaLTC1,Mt.ltc_2.value=H.state.rectAreaLTC2,Mt.pointLights.value=H.state.point,Mt.pointLightShadows.value=H.state.pointShadow,Mt.hemisphereLights.value=H.state.hemi,Mt.sunShadowMatrix.value=H.state.sunShadowMatrix,Mt.sunShadowCascade.value=H.state.sunShadowCascade,Mt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Mt.spotLightMatrix.value=H.state.spotLightMatrix,Mt.spotLightMap.value=H.state.spotLightMap,Mt.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=w.state.lightProbeGridArray.length>0,V.currentProgram=Vt,V.uniformsList=null,Vt}function Kc(M){if(M.uniformsList===null){let D=M.currentProgram.getUniforms();M.uniformsList=_s.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function Qc(M,D){let W=G.get(M);W.outputColorSpace=D.outputColorSpace,W.batching=D.batching,W.batchingColor=D.batchingColor,W.instancing=D.instancing,W.instancingColor=D.instancingColor,W.instancingMorph=D.instancingMorph,W.skinning=D.skinning,W.morphTargets=D.morphTargets,W.morphNormals=D.morphNormals,W.morphColors=D.morphColors,W.morphTargetsCount=D.morphTargetsCount,W.numClippingPlanes=D.numClippingPlanes,W.numIntersection=D.numClipIntersection,W.vertexAlphas=D.vertexAlphas,W.vertexTangents=D.vertexTangents,W.toneMapping=D.toneMapping}function Xf(M,D){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(D.matrixWorld);for(let W=0,V=M.length;W<V;W++){let H=M[W];if(H.texture!==null&&H.boundingBox.containsPoint(y))return H}return null}function qf(M,D,W,V,H){D.isScene!==!0&&(D=Ge),Z.resetTextureUnits();let dt=D.fog,xt=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?D.environment:null,ft=it===null?I.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Gt.workingColorSpace,yt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,bt=st.get(V.envMap||xt,yt),Ut=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Vt=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Mt=!!W.morphAttributes.position,Kt=!!W.morphAttributes.normal,_e=!!W.morphAttributes.color,he=xi;V.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(he=I.toneMapping);let se=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,De=se!==void 0?se.length:0,mt=G.get(V),Be=w.state.lights;if(Zt===!0&&(ae===!0||M!==j)){let ce=M===j&&V.id===X;Tt.setState(V,M,ce)}let Yt=!1;V.version===mt.__version?(mt.needsLights&&mt.lightsStateVersion!==Be.state.version||mt.outputColorSpace!==ft||H.isBatchedMesh&&mt.batching===!1||!H.isBatchedMesh&&mt.batching===!0||H.isBatchedMesh&&mt.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&mt.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&mt.instancing===!1||!H.isInstancedMesh&&mt.instancing===!0||H.isSkinnedMesh&&mt.skinning===!1||!H.isSkinnedMesh&&mt.skinning===!0||H.isInstancedMesh&&mt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&mt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&mt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&mt.instancingMorph===!1&&H.morphTexture!==null||mt.envMap!==bt||V.fog===!0&&mt.fog!==dt||mt.numClippingPlanes!==void 0&&(mt.numClippingPlanes!==Tt.numPlanes||mt.numIntersection!==Tt.numIntersection)||mt.vertexAlphas!==Ut||mt.vertexTangents!==Vt||mt.morphTargets!==Mt||mt.morphNormals!==Kt||mt.morphColors!==_e||mt.toneMapping!==he||mt.morphTargetsCount!==De||!!mt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Yt=!0):(Yt=!0,mt.__version=V.version);let ri=mt.currentProgram;Yt===!0&&(ri=_r(V,D,H),F&&V.isNodeMaterial&&F.onUpdateProgram(V,ri,mt));let bi=!1,Ji=!1,Bn=!1,ee=ri.getUniforms(),me=mt.uniforms;if(x.useProgram(ri.program)&&(bi=!0,Ji=!0,Bn=!0),V.id!==X&&(X=V.id,Ji=!0),mt.needsLights){let ce=Xf(w.state.lightProbeGridArray,H);mt.lightProbeGrid!==ce&&(mt.lightProbeGrid=ce,Ji=!0)}if(bi||j!==M){x.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ee.setValue(U,"projectionMatrix",M.projectionMatrix),ee.setValue(U,"viewMatrix",M.matrixWorldInverse);let Ki=ee.map.cameraPosition;Ki!==void 0&&Ki.setValue(U,fe.setFromMatrixPosition(M.matrixWorld)),C.logarithmicDepthBuffer&&ee.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ee.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),j!==M&&(j=M,Ji=!0,Bn=!0)}if(mt.needsLights&&(Be.state.sunShadowMap.length>0&&ee.setValue(U,"sunShadowMap",Be.state.sunShadowMap,Z),Be.state.directionalShadowMap.length>0&&ee.setValue(U,"directionalShadowMap",Be.state.directionalShadowMap,Z),Be.state.spotShadowMap.length>0&&ee.setValue(U,"spotShadowMap",Be.state.spotShadowMap,Z),Be.state.pointShadowMap.length>0&&ee.setValue(U,"pointShadowMap",Be.state.pointShadowMap,Z)),H.isSkinnedMesh){ee.setOptional(U,H,"bindMatrix"),ee.setOptional(U,H,"bindMatrixInverse");let ce=H.skeleton;ce&&(ce.boneTexture===null&&ce.computeBoneTexture(),ee.setValue(U,"boneTexture",ce.boneTexture,Z))}H.isBatchedMesh&&(ee.setOptional(U,H,"batchingTexture"),ee.setValue(U,"batchingTexture",H._matricesTexture,Z),ee.setOptional(U,H,"batchingIdTexture"),ee.setValue(U,"batchingIdTexture",H._indirectTexture,Z),ee.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&ee.setValue(U,"batchingColorTexture",H._colorsTexture,Z));let $i=W.morphAttributes;if(($i.position!==void 0||$i.normal!==void 0||$i.color!==void 0)&&N.update(H,W,ri),(Ji||mt.receiveShadow!==H.receiveShadow)&&(mt.receiveShadow=H.receiveShadow,ee.setValue(U,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&D.environment!==null&&(me.envMapIntensity.value=D.environmentIntensity),me.dfgLUT!==void 0&&(me.dfgLUT.value=k_()),Ji){if(ee.setValue(U,"toneMappingExposure",I.toneMappingExposure),mt.needsLights&&Yf(me,Bn),dt&&V.fog===!0&&wt.refreshFogUniforms(me,dt),wt.refreshMaterialUniforms(me,V,tt,J,w.state.transmissionRenderTarget[M.id]),mt.needsLights&&mt.lightProbeGrid){let ce=mt.lightProbeGrid;me.probesSH.value=ce.texture,me.probesMin.value.copy(ce.boundingBox.min),me.probesMax.value.copy(ce.boundingBox.max),me.probesResolution.value.copy(ce.resolution)}_s.upload(U,Kc(mt),me,Z)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(_s.upload(U,Kc(mt),me,Z),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ee.setValue(U,"center",H.center),ee.setValue(U,"modelViewMatrix",H.modelViewMatrix),ee.setValue(U,"normalMatrix",H.normalMatrix),ee.setValue(U,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){let ce=V.uniformsGroups;for(let Ki=0,On=ce.length;Ki<On;Ki++){let th=ce[Ki];nt.update(th,ri),nt.bind(th,ri)}}return ri}function Yf(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.sunLights.needsUpdate=D,M.sunLightShadows.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function Zf(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(M,D,W){let V=G.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),G.get(M.texture).__webglTexture=D,G.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,D){let W=G.get(M);W.__webglFramebuffer=D,W.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(M,D=0,W=0){it=M,Y=D,q=W;let V=null,H=!1,dt=!1;if(M){let ft=G.get(M);if(ft.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(U.FRAMEBUFFER,ft.__webglFramebuffer),et.copy(M.viewport),Ct.copy(M.scissor),Et=M.scissorTest,x.viewport(et),x.scissor(Ct),x.setScissorTest(Et),X=-1;return}else if(ft.__webglFramebuffer===void 0)Z.setupRenderTarget(M);else if(ft.__hasExternalTextures)Z.rebindTextures(M,G.get(M.texture).__webglTexture,G.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Ut=M.depthTexture;if(ft.__boundDepthTexture!==Ut){if(Ut!==null&&G.has(Ut)&&(M.width!==Ut.image.width||M.height!==Ut.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(M)}}let yt=M.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(dt=!0);let bt=G.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(bt[D])?V=bt[D][W]:V=bt[D],H=!0):M.samples>0&&Z.useMultisampledRTT(M)===!1?V=G.get(M).__webglMultisampledFramebuffer:Array.isArray(bt)?V=bt[W]:V=bt,et.copy(M.viewport),Ct.copy(M.scissor),Et=M.scissorTest}else et.copy(_t).multiplyScalar(tt).floor(),Ct.copy(Ot).multiplyScalar(tt).floor(),Et=Me;if(W!==0&&(V=B),x.bindFramebuffer(U.FRAMEBUFFER,V)&&x.drawBuffers(M,V),x.viewport(et),x.scissor(Ct),x.setScissorTest(Et),H){let ft=G.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,ft.__webglTexture,W)}else if(dt){let ft=D;for(let yt=0;yt<M.textures.length;yt++){let bt=G.get(M.textures[yt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+yt,bt.__webglTexture,W,ft)}}else if(M!==null&&W!==0){let ft=G.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ft.__webglTexture,W)}X=-1};function jc(M){let D=G.get(M);return(D.__readFormat!==M.format||D.__readType!==M.type)&&(D.__readFormat=M.format,D.__readType=M.type,D.__formatReadable=C.textureFormatReadable(M.format),D.__typeReadable=C.textureTypeReadable(M.type)),D}this.readRenderTargetPixels=function(M,D,W,V,H,dt,xt,ft=0){if(!(M&&M.isWebGLRenderTarget)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xt!==void 0&&(yt=yt[xt]),yt){x.bindFramebuffer(U.FRAMEBUFFER,yt);try{let bt=M.textures[ft],Ut=bt.format,Vt=bt.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);let Mt=jc(bt);if(Mt.__formatReadable===!1){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Mt.__typeReadable===!1){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-V&&W>=0&&W<=M.height-H&&U.readPixels(D,W,V,H,ct.convert(Ut),ct.convert(Vt),dt)}finally{let bt=it!==null?G.get(it).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(M,D,W,V,H,dt,xt,ft=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xt!==void 0&&(yt=yt[xt]),yt)if(D>=0&&D<=M.width-V&&W>=0&&W<=M.height-H){x.bindFramebuffer(U.FRAMEBUFFER,yt);let bt=M.textures[ft],Ut=bt.format,Vt=bt.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);let Mt=jc(bt);if(Mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Kt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Kt),U.bufferData(U.PIXEL_PACK_BUFFER,dt.byteLength,U.STREAM_READ),U.readPixels(D,W,V,H,ct.convert(Ut),ct.convert(Vt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let _e=it!==null?G.get(it).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,_e);let he=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Ru(U,he,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Kt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,dt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(Kt),U.deleteSync(he),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,D=null,W=0){let V=Math.pow(2,-W),H=Math.floor(M.image.width*V),dt=Math.floor(M.image.height*V),xt=D!==null?D.x:0,ft=D!==null?D.y:0;Z.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,xt,ft,H,dt),x.unbindTexture()},this.copyTextureToTexture=function(M,D,W=null,V=null,H=0,dt=0){let xt,ft,yt,bt,Ut,Vt,Mt,Kt,_e,he=M.isCompressedTexture?M.mipmaps[dt]:M.image;if(W!==null)xt=W.max.x-W.min.x,ft=W.max.y-W.min.y,yt=W.isBox3?W.max.z-W.min.z:1,bt=W.min.x,Ut=W.min.y,Vt=W.isBox3?W.min.z:0;else{let me=Math.pow(2,-H);xt=Math.floor(he.width*me),ft=Math.floor(he.height*me),M.isDataArrayTexture?yt=he.depth:M.isData3DTexture?yt=Math.floor(he.depth*me):yt=1,bt=0,Ut=0,Vt=0}V!==null?(Mt=V.x,Kt=V.y,_e=V.z):(Mt=0,Kt=0,_e=0);let se=ct.convert(D.format),De=ct.convert(D.type),mt;D.isData3DTexture?(Z.setTexture3D(D,0),mt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Z.setTexture2DArray(D,0),mt=U.TEXTURE_2D_ARRAY):(Z.setTexture2D(D,0),mt=U.TEXTURE_2D),x.activeTexture(U.TEXTURE0),x.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),x.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),x.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);let Be=x.getParameter(U.UNPACK_ROW_LENGTH),Yt=x.getParameter(U.UNPACK_IMAGE_HEIGHT),ri=x.getParameter(U.UNPACK_SKIP_PIXELS),bi=x.getParameter(U.UNPACK_SKIP_ROWS),Ji=x.getParameter(U.UNPACK_SKIP_IMAGES);x.pixelStorei(U.UNPACK_ROW_LENGTH,he.width),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,he.height),x.pixelStorei(U.UNPACK_SKIP_PIXELS,bt),x.pixelStorei(U.UNPACK_SKIP_ROWS,Ut),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Vt);let Bn=M.isDataArrayTexture||M.isData3DTexture,ee=D.isDataArrayTexture||D.isData3DTexture;if(M.isDepthTexture){let me=G.get(M),$i=G.get(D),ce=G.get(me.__renderTarget),Ki=G.get($i.__renderTarget);x.bindFramebuffer(U.READ_FRAMEBUFFER,ce.__webglFramebuffer),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ki.__webglFramebuffer);for(let On=0;On<yt;On++)Bn&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(M).__webglTexture,H,Vt+On),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(D).__webglTexture,dt,_e+On)),U.blitFramebuffer(bt,Ut,xt,ft,Mt,Kt,xt,ft,U.DEPTH_BUFFER_BIT,U.NEAREST);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||M.isRenderTargetTexture||G.has(M)){let me=G.get(M),$i=G.get(D);x.bindFramebuffer(U.READ_FRAMEBUFFER,P),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let ce=0;ce<yt;ce++)Bn?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,me.__webglTexture,H,Vt+ce):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,me.__webglTexture,H),ee?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$i.__webglTexture,dt,_e+ce):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,$i.__webglTexture,dt),H!==0?U.blitFramebuffer(bt,Ut,xt,ft,Mt,Kt,xt,ft,U.COLOR_BUFFER_BIT,U.NEAREST):ee?U.copyTexSubImage3D(mt,dt,Mt,Kt,_e+ce,bt,Ut,xt,ft):U.copyTexSubImage2D(mt,dt,Mt,Kt,bt,Ut,xt,ft);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ee?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(mt,dt,Mt,Kt,_e,xt,ft,yt,se,De,he.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(mt,dt,Mt,Kt,_e,xt,ft,yt,se,he.data):U.texSubImage3D(mt,dt,Mt,Kt,_e,xt,ft,yt,se,De,he):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,dt,Mt,Kt,xt,ft,se,De,he.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,dt,Mt,Kt,he.width,he.height,se,he.data):U.texSubImage2D(U.TEXTURE_2D,dt,Mt,Kt,xt,ft,se,De,he);x.pixelStorei(U.UNPACK_ROW_LENGTH,Be),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Yt),x.pixelStorei(U.UNPACK_SKIP_PIXELS,ri),x.pixelStorei(U.UNPACK_SKIP_ROWS,bi),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Ji),dt===0&&D.generateMipmaps&&U.generateMipmap(mt),x.unbindTexture()},this.initRenderTarget=function(M){G.get(M).__webglFramebuffer===void 0&&Z.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Z.setTextureCube(M,0):M.isData3DTexture?Z.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Z.setTexture2DArray(M,0):Z.setTexture2D(M,0),x.unbindTexture()},this.resetState=function(){Y=0,q=0,it=null,x.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Gt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Gt._getUnpackColorSpace()}};var jt=1e-7,ci=class s{constructor(t,e,i,n,r,o){this.x0=t,this.y0=e,this.z0=i,this.x1=n,this.y1=r,this.z1=o}static fromCenter(t,e,i,n,r){return new s(t-n,e,i-n,t+n,e+r,i+n)}clone(){return new s(this.x0,this.y0,this.z0,this.x1,this.y1,this.z1)}set(t){return this.x0=t.x0,this.y0=t.y0,this.z0=t.z0,this.x1=t.x1,this.y1=t.y1,this.z1=t.z1,this}offset(t,e,i){return this.x0+=t,this.x1+=t,this.y0+=e,this.y1+=e,this.z0+=i,this.z1+=i,this}moved(t,e,i){return new s(this.x0+t,this.y0+e,this.z0+i,this.x1+t,this.y1+e,this.z1+i)}expand(t,e,i){let n=this.clone();return t<0?n.x0+=t:n.x1+=t,e<0?n.y0+=e:n.y1+=e,i<0?n.z0+=i:n.z1+=i,n}grow(t,e=t,i=t){return new s(this.x0-t,this.y0-e,this.z0-i,this.x1+t,this.y1+e,this.z1+i)}shrink(t){return this.grow(-t)}intersects(t){return this.x0<t.x1&&this.x1>t.x0&&this.y0<t.y1&&this.y1>t.y0&&this.z0<t.z1&&this.z1>t.z0}contains(t,e,i){return t>=this.x0&&t<this.x1&&e>=this.y0&&e<this.y1&&i>=this.z0&&i<this.z1}},V_=()=>Qi.soul_sand?.id??-1,Lc=-2,ff=[],H_=[],Ra=0;function G_(s,t,e,i,n,r){let o=ff[Ra];return o||(o=ff[Ra]=new ci(.5,.5,.5,.5,.5,.5)),Ra++,o.x0=s,o.y0=t,o.z0=e,o.x1=i,o.y1=n,o.z1=r,o}var W_=(s,t,e,i,n,r)=>new ci(s,t,e,i,n,r),gf=null,_f=0,xf=0,vf=0,X_=(s,t,e)=>gf.getBlock(_f+s,xf+t,vf+e);function yf(s,t,e){Lc===-2&&(Lc=V_());let i=W_;e||(e=H_,e.length=0,Ra=0,i=G_);let n=Math.floor(t.x0-jt),r=Math.floor(t.x1+jt),o=Math.floor(t.y0-jt)-1,a=Math.floor(t.y1+jt),l=Math.floor(t.z0-jt),c=Math.floor(t.z1+jt);for(let h=n;h<=r;h++)for(let f=l;f<=c;f++){let u=!!s.getChunkAt(h,f);for(let d=o;d<=a;d++){if(!u){d>=0&&d<256&&e.push(i(h,d,f,h+1,d+1,f+1));continue}let g=s.getBlock(h,d,f);if(!Se[g])continue;let _=gt[g];if(g===Lc){e.push(i(h,d,f,h+1,d+14/16,f+1));continue}if(_.shape==="cube"){e.push(i(h,d,f,h+1,d+1,f+1));continue}if(_.dynamicCollision)continue;let m=s.getMeta(h,d,f);gf=s,_f=h,xf=d,vf=f;for(let p of ji(_,m,X_))e.push(i(h+p[0],d+p[1],f+p[2],h+p[3],d+p[4],f+p[5]))}}for(let h=0;h<df.length;h++)df[h](s,t,e,i);return e}var df=[];function gn(s,t){let e=yf(s,t);for(let i=0;i<e.length;i++)if(e[i].intersects(t))return!1;return!0}function q_(s,t,e){if(Math.abs(e)<jt)return 0;for(let i=0;i<t.length;i++){let n=t[i];n.y1<=s.y0+jt||n.y0>=s.y1-jt||n.z1<=s.z0+jt||n.z0>=s.z1-jt||(e>0&&n.x0>=s.x1-jt?e=Math.min(e,n.x0-s.x1):e<0&&n.x1<=s.x0+jt&&(e=Math.max(e,n.x1-s.x0)))}return Math.abs(e)<jt?0:e}function Y_(s,t,e){if(Math.abs(e)<jt)return 0;for(let i=0;i<t.length;i++){let n=t[i];n.x1<=s.x0+jt||n.x0>=s.x1-jt||n.z1<=s.z0+jt||n.z0>=s.z1-jt||(e>0&&n.y0>=s.y1-jt?e=Math.min(e,n.y0-s.y1):e<0&&n.y1<=s.y0+jt&&(e=Math.max(e,n.y1-s.y0)))}return Math.abs(e)<jt?0:e}function pf(s,t,e){if(Math.abs(e)<jt)return 0;for(let i=0;i<t.length;i++){let n=t[i];n.x1<=s.x0+jt||n.x0>=s.x1-jt||n.y1<=s.y0+jt||n.y0>=s.y1-jt||(e>0&&n.z0>=s.z1-jt?e=Math.min(e,n.z0-s.z1):e<0&&n.z1<=s.z0+jt&&(e=Math.max(e,n.z1-s.z0)))}return Math.abs(e)<jt?0:e}var Z_=new ci(.5,.5,.5,.5,.5,.5);function pr(s,t,e,i,n){let r=Z_.set(s);i!==0&&(i=Y_(r,t,i),i!==0&&r.offset(0,i,0));let o=Math.abs(e)<Math.abs(n);return o&&n!==0&&(n=pf(r,t,n),n!==0&&r.offset(0,0,n)),e!==0&&(e=q_(r,t,e),!o&&e!==0&&r.offset(e,0,0)),!o&&n!==0&&(n=pf(r,t,n)),[e,i,n]}var J_=new ci(.5,.5,.5,.5,.5,.5);function Mf(s,t,e,i,n,r=0,o=!1){let a=Math.max(r,0),l=J_.set(t);e<0?l.x0+=e:l.x1+=e,i<0?l.y0+=i:l.y1+=i,n<0?l.z0+=n:l.z1+=n,l.y1+=a;let c=yf(s,l),[h,f,u]=pr(t,c,e,i,n),d=h!==e,g=u!==n,_=f!==i,m=!1;if(r>0&&(o||_&&i<0)&&(d||g)){let y=pr(t,c,e,r,n),b=pr(t.expand(e,0,n),c,0,r,0);if(b[1]<r){let w=pr(t.moved(0,b[1],0),c,e,0,n);w[1]+=b[1],w[0]*w[0]+w[2]*w[2]>y[0]*y[0]+y[2]*y[2]&&(y=w)}if(y[0]*y[0]+y[2]*y[2]>h*h+u*u){let w=pr(t.moved(y[0],y[1],y[2]),c,0,-y[1]+i,0);h=y[0],f=y[1]+w[1],u=y[2],m=!0}}t.offset(h,f,u);let p=h!==e,S=u!==n,E=f!==i;return{dx:h,dy:f,dz:u,collidedX:p,collidedY:E,collidedZ:S,collidedH:Math.abs(e-h)>1e-5||Math.abs(n-u)>1e-5,onGround:E&&i<0,stepped:m}}function Sf(s,t,e){let i=Math.floor(t.x0),n=Math.floor(t.x1-1e-7),r=Math.floor(t.y0),o=Math.floor(t.y1-1e-7),a=Math.floor(t.z0),l=Math.floor(t.z1-1e-7);for(let c=i;c<=n;c++)for(let h=r;h<=o;h++)for(let f=a;f<=l;f++){let u=s.getBlock(c,h,f);if(u&&e(gt[u],s.getMeta(c,h,f),c,h,f))return!0}return!1}function bf(s){return s&8?8:8-(s&7)}function Zi(s,t,e,i){let n=gt[s.getBlock(t,e,i)];return n.liquid?n.liquid:s.isWaterlogged?.(t,e,i)?"water":null}function Nc(s,t,e,i){return gt[s.getBlock(t,e,i)].liquid?s.getMeta(t,e,i):0}function Uc(s,t,e,i,n){return Zi(s,t,e,i)!==n?0:Zi(s,t,e+1,i)===n?1:bf(Nc(s,t,e,i))/9}function Dc(s,t,e,i,n){return Zi(s,t,e,i)!==n?0:bf(Nc(s,t,e,i))/9}var mf=[[0,-1],[0,1],[-1,0],[1,0]];function $_(s,t,e,i,n){let r=Dc(s,t,e,i,n),o=0,a=0;for(let[h,f]of mf){let u=s.getBlock(t+h,e,i+f),d=Zi(s,t+h,e,i+f);if(d&&d!==n)continue;let g=d===n?Dc(s,t+h,e,i+f,n):0,_=0;if(g===0){if(!Se[u]||d){let m=Zi(s,t+h,e-1,i+f);(!m||m===n)&&(g=m===n?Dc(s,t+h,e-1,i+f,n):0,g>0&&(_=r-(g-.8888889)))}}else g>0&&(_=r-g);_!==0&&(o+=h*_,a+=f*_)}let l=0;if(Nc(s,t,e,i)&8){for(let[h,f]of mf)if(Se[s.getBlock(t+h,e,i+f)]||Se[s.getBlock(t+h,e+1,i+f)]){let u=Math.hypot(o,a);u>1e-4?(o/=u,a/=u):(o=0,a=0),l=-6;break}}let c=Math.hypot(o,l,a);return c<1e-4?[0,0,0]:[o/c,l/c,a/c]}function Ia(s,t,e,i,n=0,r=0,o=!0){let a=t.shrink(.001),l=Math.floor(a.x0),c=Math.ceil(a.x1),h=Math.floor(a.y0),f=Math.ceil(a.y1),u=Math.floor(a.z0),d=Math.ceil(a.z1),g=0,_=!1,m=0,p=0,S=0,E=0;for(let w=l;w<c;w++)for(let R=h;R<f;R++)for(let v=u;v<d;v++){if(Zi(s,w,R,v)!==e)continue;let T=R+Uc(s,w,R,v,e);if(T>=a.y0&&(_=!0,g=Math.max(T-a.y0,g),o)){let[I,L,F]=$_(s,w,R,v,e);g<.4&&(I*=g,L*=g,F*=g),m+=I,p+=L,S+=F,E++}}let y=null;if(Math.hypot(m,p,S)>0&&E>0){m/=E,p/=E,S/=E,m*=i,p*=i,S*=i;let w=Math.hypot(m,p,S);Math.abs(n)<.003&&Math.abs(r)<.003&&w<.0045&&w>0&&(m=m/w*.0045,p=p/w*.0045,S=S/w*.0045),y=[m,p,S]}return{touching:_,height:g,push:y}}function _n(s,t,e,i,n,r=!1){let o=s.getBlock(t,e,i);if(!o)return!1;let a=gt[o];if(!a.solid)return!1;if(a.shape==="cube")return!0;let l=s.getMeta(t,e,i),c=ji(a,l,(d,g,_)=>s.getBlock(t+d,e+g,i+_)),h=r?7/16:0,f=r?9/16:1,u=1e-4;for(let d of c)switch(n){case 0:if(d[3]>=1-u&&d[1]<=h+u&&d[4]>=f-u&&d[2]<=h+u&&d[5]>=f-u)return!0;break;case 1:if(d[0]<=u&&d[1]<=h+u&&d[4]>=f-u&&d[2]<=h+u&&d[5]>=f-u)return!0;break;case 2:if(d[4]>=1-u&&d[0]<=h+u&&d[3]>=f-u&&d[2]<=h+u&&d[5]>=f-u)return!0;break;case 3:if(d[1]<=u&&d[0]<=h+u&&d[3]>=f-u&&d[2]<=h+u&&d[5]>=f-u)return!0;break;case 4:if(d[5]>=1-u&&d[0]<=h+u&&d[3]>=f-u&&d[1]<=h+u&&d[4]>=f-u)return!0;break;case 5:if(d[2]<=u&&d[0]<=h+u&&d[3]>=f-u&&d[1]<=h+u&&d[4]>=f-u)return!0;break}return!1}function wf(s,t,e,i,n,r,o,a){let l=Math.hypot(n,r,o)||1;n/=l,r/=l,o/=l;let c=Math.floor(t),h=Math.floor(e),f=Math.floor(i),u=n>0?1:-1,d=r>0?1:-1,g=o>0?1:-1,_=Math.abs(1/n),m=Math.abs(1/r),p=Math.abs(1/o),S=n>0?(c+1-t)*_:(t-c)*_,E=r>0?(h+1-e)*m:(e-h)*m,y=o>0?(f+1-i)*p:(i-f)*p;isFinite(S)||(S=1/0),isFinite(E)||(E=1/0),isFinite(y)||(y=1/0);let b=0;for(let w=0;w<64&&b<=a;w++){let R=s.getBlock(c,h,f);if(Se[R]){let v=gt[R],T=v.shape==="cube"?[[0,0,0,1,1,1]]:ji(v,s.getMeta(c,h,f),(L,F,B)=>s.getBlock(c+L,h+F,f+B)),I=1/0;for(let L of T){let F=-1/0,B=1/0,P=!0,z=[t,e,i],Y=[n,r,o],q=[c+L[0],h+L[1],f+L[2]],it=[c+L[3],h+L[4],f+L[5]];for(let X=0;X<3&&P;X++){if(Math.abs(Y[X])<1e-9){(z[X]<q[X]||z[X]>it[X])&&(P=!1);continue}let j=(q[X]-z[X])/Y[X],et=(it[X]-z[X])/Y[X];if(j>et){let Ct=j;j=et,et=Ct}F=Math.max(F,j),B=Math.min(B,et),F>B&&(P=!1)}P&&B>=0&&(I=Math.min(I,Math.max(0,F)))}if(I<=a)return I}S<E?S<y?(c+=u,b=S,S+=_):(f+=g,b=y,y+=p):E<y?(h+=d,b=E,E+=m):(f+=g,b=y,y+=p)}return 1/0}function Ef(s){let t=-Math.sin(s),e=-Math.cos(s);return Math.abs(t)>Math.abs(e)?t>0?3:2:e>0?1:0}var Da=[1,0,3,2],vs={0:3,1:2,4:1,5:0},Pa=[5,4,1,0],xn=[1,0,3,2,5,4],Tf=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];function K_(s){let[t,e,i]=s.lookDir(),n=[{m:Math.abs(t),f:t>0?0:1},{m:Math.abs(e),f:e>0?2:3},{m:Math.abs(i),f:i>0?4:5}].sort((l,c)=>c.m-l.m),[r,o,a]=n.map(l=>l.f);return[r,o,a,xn[a],xn[o],xn[r]]}function La(s,t){let e=K_(s);if(t.replaceClicked)return e;let i=xn[t.face];return[i,...e.filter(n=>n!==i)]}var Q_=new Set(["grass_block","dirt","coarse_dirt","podzol","farmland"]),ys=(s,...t)=>t.includes(s.name);function mr(s,t,e,i,n,r,o){let a=s.getBlock(t,e,i),l=gt[a],c=s.getMeta(t,e,i);if(n.shape==="slab"&&a===n.id&&c!==2){if(!o)return!0;let h=r.hitY>.5,f=r.face!==2&&r.face!==3;return c===0?r.face===2||h&&f:r.face===3||!h&&f}return l.shape==="snow_layer"?n.id===l.id?(c&7)<7&&(o?r.face===2:!0):(c&7)===0:l.shape==="vine"&&n.id===l.id?(c&15)!==15:l.liquid?!n.liquid&&(n.solid||n.waterlogged||n.shape==="ladder"||n.shape==="vine"||n.name==="cobweb"):!!l.replaceable}function Fn(s,t,e,i,n,r=0){if(n.canSurvive)return n.canSurvive(s,t,e,i,r);let o=s.getBlock(t,e-1,i),a=gt[o],l=()=>_n(s,t,e-1,i,2),c=()=>_n(s,t,e-1,i,2,!0),h=n.name;switch(n.shape){case"cross":case"double_plant":{if(n.shape==="double_plant"&&r&1)return s.getBlock(t,e-1,i)===n.id;if(h==="dead_bush")return ys(a,"sand","red_sand","dirt","coarse_dirt","podzol")||a.name.endsWith("terracotta");if(h.endsWith("mushroom")){if(ys(a,"mycelium","podzol"))return!0;let f=s.getLight?s.getLight(t,e,i):0;return oi[o]===1&&Math.max(f>>4,f&15)<13}if(h==="cobweb")return!0;if(h==="sugar_cane"){if(o===n.id)return!0;if(!ys(a,"grass_block","dirt","coarse_dirt","podzol","sand","red_sand"))return!1;for(let[f,u]of[[1,0],[-1,0],[0,1],[0,-1]]){let d=gt[s.getBlock(t+f,e-1,i+u)];if(d.liquid==="water"||d.name==="frosted_ice")return!0}return!1}return h==="nether_wart"?a.name==="soul_sand":Q_.has(a.name)}case"crop":case"stem":return a.name==="farmland";case"cactus":{if(!ys(a,"sand","red_sand","cactus"))return!1;for(let[f,u]of[[1,0],[-1,0],[0,1],[0,-1]]){let d=gt[s.getBlock(t+f,e,i+u)];if(d.solid&&d.shape!=="none"||d.liquid==="lava")return!1}return!gt[s.getBlock(t,e+1,i)].liquid}case"flat":return a.liquid==="water"?(s.getMeta(t,e-1,i)&7)===0:ys(a,"ice","packed_ice","blue_ice","frosted_ice");case"carpet":return o!==0;case"pressure_plate":return l()||c();case"rail":case"redstone_wire":return l()||n.shape==="redstone_wire"&&a.name==="glowstone";case"snow_layer":return ys(a,"ice","packed_ice","barrier")?!1:a.shape==="snow_layer"?(s.getMeta(t,e-1,i)&7)===7:l()||a.leaves===!0;case"door":return r&8?s.getBlock(t,e-1,i)===n.id:l();case"cake":return a.solid&&!a.liquid;case"torch":{if(!r)return c();let f=wi[r-1];return _n(s,t+f[0],e,i+f[2],xn[Pa[r-1]])}case"ladder":{let f=wi[r&3];return _n(s,t+f[0],e,i+f[2],xn[Pa[r&3]])}case"button":case"lever":{let f=r&7;if(f===0)return l();if(f===5)return _n(s,t,e+1,i,3);let u=wi[f-1];return _n(s,t+u[0],e,i+u[2],xn[Pa[f-1]])}case"vine":{for(let f=0;f<4;f++)if(r&1<<f){let u=wi[f];if(!_n(s,t+u[0],e,i+u[2],xn[Pa[f]]))return!1}return!0}default:return!0}}function Un(s,t,e,i,n,r,o){let a=ji(r,o,(l,c,h)=>s.world.getBlock(e+l,i+c,n+h));if(!a.length)return!1;if(s.entities?.blocksPlacement?.(e,i,n,r,o))return!0;if(t&&!t.spectator){let l=t.aabb;for(let c of a)if(l.intersects(new ci(e+c[0],i+c[1],n+c[2],e+c[3],i+c[4],n+c[5])))return!0}return!1}function j_(s,t,e,i,n,r,o){let a=Ef(t.yaw),l=o.face,c=l!==2&&l!==3;if(e.placementMeta)return e.placementMeta(l,a,o);if(e.pillar)return l===0||l===1?1:l===4||l===5?2:0;switch(e.shape){case"stairs":return a|(l!==3&&(l===2||o.hitY<=.5)?0:4);case"slab":return l!==3&&(l===2||!(o.hitY>.5))?0:1;case"torch":{for(let h of La(t,o)){if(h===2)continue;let f=h===3?0:vs[h]+1;if(Fn(s,i,n,r,e,f))return f}return null}case"ladder":{if(!o.replaceClicked&&c){let h=i-Tf[l][0],f=r-Tf[l][2];if(s.getBlock(h,n,f)===e.id&&s.getMeta(h,n,f)===Da[vs[l]])return null}for(let h of La(t,o)){if(h===2||h===3)continue;let f=vs[h];if(Fn(s,i,n,r,e,f))return f}return null}case"button":case"lever":{for(let h of La(t,o)){let f=h===3?0:h===2?5:vs[h]+1;if(Fn(s,i,n,r,e,f))return f}return null}case"vine":{let h=s.getBlock(i,n,r)===e.id?s.getMeta(i,n,r)&15:0;for(let f of La(t,o)){if(f===2||f===3)continue;let u=1<<vs[f];if(!(h&u)&&Fn(s,i,n,r,e,u))return h|u}return h||null}case"trapdoor":return!o.replaceClicked&&c?vs[l]|(o.hitY>.5?8:0):Da[a]|(l===2?0:8);case"fence_gate":return a;case"rail":return tx(s,i,n,r,e,a);case"snow_layer":return 0;default:return e.name==="anvil"?a:e.facing?e.shape==="chest"||e.textures?.front?Da[a]:a:0}}function Fc(s,t,e,i){return gt[s.getBlock(t,e,i)]?.shape==="rail"}function tx(s,t,e,i,n,r){let o=(u,d)=>Fc(s,t+u,e,i+d)||Fc(s,t+u,e-1,i+d)?1:Fc(s,t+u,e+1,i+d)?2:0,a=o(0,-1),l=o(0,1),c=o(-1,0),h=o(1,0);if(n.name==="rail"&&(a||l)&&(h||c)&&!(a&&l||h&&c)){if(l&&h)return 6;if(l&&c)return 7;if(a&&c)return 8;if(a&&h)return 9}return(a||l)&&!(h||c)?a===2?4:l===2?5:0:(h||c)&&!(a||l)?h===2?2:c===2?3:1:r>=2?1:0}function ex(s,t,e,i,n,r,o){let a=[2,3,1,0][r],l=Da[a],c=wi[a],h=wi[l],f=(_,m,p)=>Se[s.getBlock(_,m,p)]&&gt[s.getBlock(_,m,p)].shape==="cube"?1:0,u=-f(e+c[0],i,n+c[2])-f(e+c[0],i+1,n+c[2])+f(e+h[0],i,n+h[2])+f(e+h[0],i+1,n+h[2]),d=s.getBlock(e+c[0],i,n+c[2])===t.id&&!(s.getMeta(e+c[0],i,n+c[2])&8),g=s.getBlock(e+h[0],i,n+h[2])===t.id&&!(s.getMeta(e+h[0],i,n+h[2])&8);if((!d||g)&&u<=0){if((!g||d)&&u>=0){let[_,,m]=wi[r],p=o.hitX,S=o.hitZ;return(_>=0||!(S<.5))&&(_<=0||!(S>.5))&&(m>=0||!(p>.5))&&(m<=0||!(p<.5))}return!0}return!1}function Bc(s,t,e,i){let n=s.getBlock(t,e,i);if(gt[n].shape!=="double_plant")return;let o=s.getMeta(t,e,i)&1?e-1:e+1;s.getBlock(t,o,i)===n&&s.setBlock(t,o,i,0,0)}function Af(s,t,e,i,n="main"){let r=s.world,o=Qi[e];if(!o||!i)return!1;let a={face:i.face,replaceClicked:!1,hitX:0,hitY:0,hitZ:0};a.hitY=i.point[1]-i.y;let l,c,h;if(mr(r,i.x,i.y,i.z,o,a,!0))a.replaceClicked=!0,[l,c,h]=[i.x,i.y,i.z];else if([l,c,h]=i.place,c<0||c>=256||!mr(r,l,c,h,o,a,!1))return!1;if(c<0||c>=256)return!1;a.hitX=i.point[0]-l,a.hitY=i.point[1]-c,a.hitZ=i.point[2]-h;let f=fi(o.name),u=r.getBlock(l,c,h),d=gt[u];if(o.shape==="slab"&&u===o.id)return Un(s,t,l,c,h,o,2)?!1:(r.setBlock(l,c,h,o.id,2),{x:l,y:c,z:h});if(o.shape==="snow_layer"&&u===o.id){let m=r.getMeta(l,c,h)&7;return m>=7||Un(s,t,l,c,h,o,m+1)?!1:(r.setBlock(l,c,h,o.id,m+1),{x:l,y:c,z:h})}if(o.shape==="flat"||f?.canPlaceAt&&!f.canPlaceAt(s,l,c,h,t))return!1;let g=Ef(t.yaw);switch(o.shape){case"door":{if(c+1>=256||!mr(r,l,c+1,h,o,a,!1)||!Fn(r,l,c,h,o,g))return!1;let m=ex(r,o,l,c,h,g,a)?16:0;return Un(s,t,l,c,h,o,g|m)||Un(s,t,l,c+1,h,o,g|8|m)?!1:(Bc(r,l,c,h),r.setBlock(l,c,h,o.id,g|m),r.setBlock(l,c+1,h,o.id,g|8|m),f?.onPlaced?.(s,l,c,h,t),{x:l,y:c,z:h})}case"bed":{let m=wi[g],p=l+m[0],S=h+m[2];return!mr(r,p,c,S,o,a,!1)||Un(s,t,l,c,h,o,g)||Un(s,t,p,c,S,o,g|4)?!1:(r.setBlock(l,c,h,o.id,g),r.setBlock(p,c,S,o.id,g|4),f?.onPlaced?.(s,l,c,h,t),{x:l,y:c,z:h})}case"double_plant":return c+1>=256||!mr(r,l,c+1,h,o,a,!1)||!Fn(r,l,c,h,o,0)?!1:(Bc(r,l,c,h),r.setBlock(l,c,h,o.id,0),r.setBlock(l,c+1,h,o.id,1),f?.onPlaced?.(s,l,c,h,t),{x:l,y:c,z:h})}let _=j_(r,t,o,l,c,h,a);return _==null||!Fn(r,l,c,h,o,_)||Un(s,t,l,c,h,o,_)?!1:(d.shape==="double_plant"&&Bc(r,l,c,h),r.setBlock(l,c,h,o.id,_),f?.onPlaced?.(s,l,c,h,t),{x:l,y:c,z:h})}function Cf(s,t,e,i){return i?!1:s.id===Re.slime_block?(t.vy<0&&(t.vy=-t.vy*(e?1:.8)),!0):s.shape==="bed"&&t.vy<0?(t.vy=-t.vy*.66*(e?1:.8),!0):!1}function Rf(s,t,e){if(s.id!==Re.slime_block||e)return;let i=Math.abs(t.vy);if(i<.1){let n=.4+i*.2;t.vx*=n,t.vz*=n}}function If(s,t){return s.id===Re.slime_block?[1,t?1:0]:s.id===Re.honey_block||s.name==="hay_block"?[1,.2]:s.shape==="bed"?[.5,1]:[1,1]}var Oc=null;function RS(s){Oc=s}function kc(s,t,e,i,n){if(s.onGround||s.y>e+.9375-1e-7||s.vy>=-.08)return!1;let r=.4375+n/2;if(!(Math.abs(t+.5-s.x)+1e-7>r||Math.abs(i+.5-s.z)+1e-7>r))return!1;if(s.vy<-.13){let o=-.05/s.vy;s.vx*=o,s.vz*=o}return s.vy=-.05,s.fallDistance=0,Oc&&Oc(s,t,e,i),!0}function IS(s,t,e,i){if(Re.honey_block===void 0||t.onGround||t.vy>=-.08)return;let n=Math.floor(e.x0+.001),r=Math.floor(e.x1-.001),o=Math.floor(e.y0+.001),a=Math.floor(e.y1-.001),l=Math.floor(e.z0+.001),c=Math.floor(e.z1-.001);for(let h=n;h<=r;h++)for(let f=o;f<=a;f++)for(let u=l;u<=c;u++)if(s.getBlock(h,f,u)===Re.honey_block&&kc(t,h,f,u,i))return}var pe=Math.random;function Pf(s,t,e,i){let[n,r,o]=s.lookDir(),a=Math.sin(s.yaw),l=Math.cos(s.yaw),c=l,h=-a,f=Math.sin(s.pitch),u=Math.cos(s.pitch),d=f*a,g=u,_=f*l;return[s.x-c*t+d*e+n*i,s.eyeY+g*e+r*i,s.z-h*t+_*e+o*i]}function ix(s,t,e,i){if(e)for(let n=0;n<i;n++){let[r,o,a]=(()=>{let f=(pe()-.5)*.1,u=pe()*.1+.1,d=Pf(t,f,u,0);return[d[0]-t.x,d[1]-t.eyeY+.05,d[2]-t.z]})(),[l,c,h]=Pf(t,(pe()-.5)*.3,-pe()*.6-.3,.6);s.particles?.spawn?.("item_crack",l,c,h,r,o,a,{item:e.id})}}function zc(){let s=0,t=0;for(;!s;)s=pe();for(;!t;)t=pe();return Math.sqrt(-2*Math.log(s))*Math.cos(2*Math.PI*t)}function Hc(s,t,e=1,i=0){let[n,r,o]=s.lookDir(s.yaw,s.pitch+i),a=n+zc()*.0075*e,l=r+zc()*.0075*e,c=o+zc()*.0075*e,h=Math.hypot(a,l,c)||1;return a=a/h*t,l=l/h*t,c=c/h*t,a+=s.vx,c+=s.vz,s.onGround||(l+=s.vy),[a,l,c]}var nx=new Set(["mushroom_stew","beetroot_soup","rabbit_stew","suspicious_stew"]);function Lf(s){let t=re[s.id]?.food;return t?.fast?16:t?.duration||32}function Vc(s,t,e,i,n){if(n){s.audio?.play?.("random.drink",{x:t.x,y:t.y,z:t.z,volume:.5,pitch:pe()*.1+.9});return}ix(s,t,e,i),s.audio?.play?.("random.eat",{x:t.x,y:t.y,z:t.z,volume:.5+.5*Math.floor(pe()*2),pitch:(pe()-pe())*.2+1})}var sx={offhand:!0,useAction:"eat",useDuration:s=>Lf(s),canStartUse:(s,t,e)=>t.canEat(!!re[e.id].food.alwaysEdible),onUseTick(s,t,e,i){let n=Lf(e)-(i-1);n<=25&&n%4===0&&Vc(s,t,e,5,!1)},onFinishUse(s,t,e,i){let n=re[e.id].food;Vc(s,t,e,16,!1),t.addFood(n.hunger,n.saturation),s.audio?.play?.("random.burp",{x:t.x,y:t.y,z:t.z,volume:.5,pitch:pe()*.1+.9});for(let r of n.effects||[]){let[o,a,l=0,c=1]=r;pe()<c&&t.addEffect(o,a,l)}e.id==="chorus_fruit"&&rx(s,t),t.game.events.emit("itemEaten",{stack:e,player:t}),t.creative||(t.consumeHandItem(i,1),nx.has(e.id)&&(t.getHandStack(i)?t.giveItem(new Ze("bowl",1)):t.setHandStack(i,new Ze("bowl",1))))}};function rx(s,t){let e=s.world;for(let i=0;i<16;i++){let n=t.x+(pe()-.5)*16,r=t.z+(pe()-.5)*16,o=Math.floor(Math.min(255,Math.max(0,t.y+Math.floor(pe()*16)-8)));for(;o>0&&!gt[e.getBlock(Math.floor(n),o-1,Math.floor(r))].solid;)o--;if(t.canFitAt(Math.floor(n),o,Math.floor(r))){t.teleport(n,o,r),s.audio?.play?.("mob.endermen.portal",{x:n,y:o,z:r});return}}}function ox(){for(let s of Ha)s.food&&$e(s.name,sx)}ox();$e("milk_bucket",{offhand:!0,useAction:"drink",useDuration:()=>32,canStartUse:()=>!0,onUseTick(s,t,e,i){let n=32-(i-1);n<=25&&n%4===0&&Vc(s,t,e,5,!0)},onFinishUse(s,t,e,i){t.clearEffects(),s.audio?.play?.("random.drink",{x:t.x,y:t.y,z:t.z,volume:.5,pitch:pe()*.1+.9}),t.creative||(t.consumeHandItem(i,1),t.getHandStack(i)?t.giveItem(new Ze("bucket",1)):t.setHandStack(i,new Ze("bucket",1)))}});$e("honey_bottle",{offhand:!0,useAction:"drink",useDuration:()=>40,canStartUse:(s,t)=>t.canEat(!1),onUseTick(s,t,e,i){let n=40-(i-1);n<=25&&n%4===0&&s.audio?.play?.("item.honey_bottle.drink",{x:t.x,y:t.y,z:t.z,volume:.5,pitch:pe()*.1+.9})},onFinishUse(s,t,e,i){let n=re[e.id].food;s.audio?.play?.("item.honey_bottle.drink",{x:t.x,y:t.y,z:t.z,volume:1,pitch:1+(pe()-pe())*.4}),t.addFood(n.hunger,n.saturation),s.audio?.play?.("random.burp",{x:t.x,y:t.y,z:t.z,volume:.5,pitch:pe()*.1+.9}),t.removeEffect("poison"),t.game.events.emit("itemEaten",{stack:e,player:t}),t.creative||(t.consumeHandItem(i,1),t.getHandStack(i)?t.giveItem(new Ze("glass_bottle",1)):t.setHandStack(i,new Ze("glass_bottle",1)))}});function Df(s){let t=s.inventory,e=i=>i&&(i.id==="arrow"||i.id==="spectral_arrow"||i.id==="tipped_arrow");if(e(t.offhand.slots[0]))return{inv:t.offhand,i:0};if(e(t.held))return{inv:t,i:t.selected};for(let i=0;i<t.size;i++)if(e(t.slots[i]))return{inv:t,i};return null}function ax(s){let t=s/20;return t=(t*t+t*2)/3,t>1?1:t}$e("bow",{offhand:!0,useAction:"bow",useDuration:()=>72e3,canStartUse:(s,t,e)=>t.creative||!!e.tag?.enchantments?.infinity||!!Df(t),onStartUse(s,t){t.sprinting=!1},onRelease(s,t,e,i,n){if(!e||e.id!=="bow")return;let r=e.tag?.enchantments||{},o=t.creative||!!r.infinity,a=Df(t);if(!a&&!o)return;let l=ax(i);if(l<.1)return;let c=a?a.inv.slots[a.i]:new Ze("arrow",1),[h,f,u]=Hc(t,l*3,1),d=2;r.power&&(d+=r.power*.5+.5);let g=o&&c.id==="arrow";if(s.entities?.spawn?.("arrow",t.x,t.eyeY-.1,t.z,{vx:h,vy:f,vz:u,damage:d,shooter:t,critical:l===1,knockback:r.punch||0,fire:r.flame?100:0,pickup:g||t.creative?"creative":"allowed",item:c.id,tag:c.tag||null}),t.damageHeld(1,n),s.audio?.play?.("random.bow",{x:t.x,y:t.y,z:t.z,volume:1,pitch:1/(pe()*.4+1.2)+l*.5}),!g&&!t.creative&&a){let _=a.inv.slots[a.i];_.count--,_.count<=0&&(a.inv.slots[a.i]=null),a.inv.changed()}s.events.emit("bowShoot",{player:t,power:l})}});var lx={head:0,chest:1,legs:2,feet:3};function cx(s){let t=re[s];return t?t.armor?lx[t.armor.slot]??-1:s==="carved_pumpkin"||s.endsWith("_head")||s.endsWith("_skull")||s==="elytra"?s==="elytra"?1:0:-1:-1}function Nf(s,t,e,i){let n=cx(e.id);if(n<0)return!1;let r=t.inventory.armor,o=r.slots[n];if(o&&o.tag?.enchantments?.binding_curse&&!t.creative)return!1;r.set(n,e.clone()),t.creative,(!t.creative||o)&&t.setHandStack(i,o||null);let a=re[e.id].armor?.material||"generic";return s.audio?.play?.("item.armor.equip_"+a,{x:t.x,y:t.y,z:t.z,volume:1,pitch:1}),s.events.emit("armorEquip",{player:t,stack:e,slot:n}),!0}for(let s of Ha)s.armor&&$e(s.name,{offhand:!0,onUse:(t,e,i,n,r)=>Nf(t,e,i,r)});$e("carved_pumpkin",{onUse:(s,t,e,i,n)=>i?!1:Nf(s,t,e,n)});function Na(s,t,e=0){return{offhand:!0,onUse(i,n,r,o,a){i.audio?.play?.(t,{x:n.x,y:n.y,z:n.z,volume:.5,pitch:.4/(pe()*.4+.8)}),e&&n.setCooldown(r.id,e);let[l,c,h]=Hc(n,1.5,1);return i.entities?.spawn?.(s,n.x,n.eyeY-.1,n.z,{vx:l,vy:c,vz:h,shooter:n,owner:n,item:r.id}),n.consumeHandItem(a,1),i.events.emit("itemThrow",{player:n,stack:r,entityType:s}),!0}}}$e("snowball",Na("snowball","random.bow"));$e("egg",Na("egg","random.bow"));$e("ender_pearl",Na("ender_pearl","random.bow",20));re.experience_bottle&&$e("experience_bottle",{...Na("experience_bottle","random.bow"),onUse(s,t,e,i,n){s.audio?.play?.("random.bow",{x:t.x,y:t.y,z:t.z,volume:.5,pitch:.4/(pe()*.4+.8)});let[r,o,a]=Hc(t,.7,1,20*Math.PI/180);return s.entities?.spawn?.("experience_bottle",t.x,t.eyeY-.1,t.z,{vx:r,vy:o,vz:a,shooter:t,owner:t,item:e.id}),t.consumeHandItem(n,1),!0}});$e("shield",{offhand:!0,useAction:"block",useDuration:()=>72e3,canStartUse:(s,t)=>t.shieldDisabled<=0});$e("lily_pad",{offhand:!0,onUse(s,t,e,i,n){let r=s.world,[o,a,l]=t.lookDir(),c=r.raycast(t.x,t.eyeY,t.z,o,a,l,t.reach,{fluids:!0});if(!c)return!1;let h=gt[c.id],f=["ice","packed_ice","blue_ice"].includes(h.name)&&c.face===2;if(!(h.liquid==="water"&&(c.meta&7)===0)&&!f)return!1;let u=c.x,d=c.y+1,g=c.z;if(d>=256)return!1;let _=gt[r.getBlock(u,d,g)];if(!(_.id===0||_.replaceable&&!_.liquid))return!1;let m=Qi.lily_pad;return!m||s.entities?.blocksPlacement?.(u,d,g,m,0)?!1:(r.setBlock(u,d,g,m.id,0),s.events.emit("blockPlace",{x:u,y:d,z:g,def:m,player:t,hand:n}),t.consumeHandItem(n,1),!0)}});function FS(s){return s?s.id==="milk_bucket"||s.id==="potion"||re[s.id]?.food?.drink?"drink":re[s.id]?.food?"eat":s.id==="bow"||s.id==="crossbow"?"bow":s.id==="trident"?"spear":s.id==="shield"?"block":"none":"none"}var Mi=.6;var Gc=1.62;var Ms={standing:{height:1.8,eye:1.62},crouching:{height:1.5,eye:1.27},swimming:{height:.6,eye:.4},sleeping:{height:.2,eye:.2}},Ui=Math.PI/180,Uf=new Set(["fall","drown","starve","void","kill","fire_tick","magic","poison","wither","suffocation","fly_into_wall","generic_bypass"]),Ua=new Set(["fire","fire_tick","lava","hot_floor"]),hx=new Set(["mob","explosion"]);function Ff(s){return s%=360,s>=180&&(s-=360),s<-180&&(s+=360),s}function vn(s,t,e){return s<t?t:s>e?e:s}var Bf=class{constructor(t){this.game=t,this.x=0,this.y=100,this.z=0,this.prevX=0,this.prevY=100,this.prevZ=0,this.vx=0,this.vy=0,this.vz=0,this.yaw=0,this.pitch=0,this.prevYaw=0,this.prevPitch=0,this.onGround=!1,this.collidedH=!1,this.collidedV=!1,this.inWater=!1,this.inLava=!1,this.headInWater=!1,this.headInLava=!1,this.onLadder=!1,this.inWeb=!1,this.waterHeight=0,this.lavaHeight=0,this.sneaking=!1,this.sprinting=!1,this.flying=!1,this.swimming=!1,this.pose="standing",this.jumping=!1,this.moveForward=0,this.moveStrafe=0,this.fallDistance=0,this.health=20,this.maxHealth=20,this.absorption=0,this.food=20,this.saturation=5,this.exhaustion=0,this.foodTimer=0,this.air=300,this.maxAir=300,this.fireTicks=0,this.hurtTime=0,this.maxHurtTime=10,this.invulnerable=0,this.lastDamage=0,this.attackedAtYaw=0,this.dead=!1,this.deathTime=0,this.deathMessage="",this.xpLevel=0,this.xpProgress=0,this.xpTotal=0,this.effects=new Map,this.inventory=new rh,this.spawnPoint=null,this.tickCount=0,this.eyeHeight=Gc,this.prevEyeHeight=Gc,this.walkDist=0,this.prevWalkDist=0,this.stepDist=0,this.nextStepDist=1,this.bob=0,this.prevBob=0,this.fov=1,this.prevFov=1,this.armPitch=0,this.armYaw=0,this.prevArmPitch=0,this.prevArmYaw=0,this.limbSwing=0,this.limbSwingAmount=0,this.prevLimbSwingAmount=0,this.bodyYaw=0,this.prevBodyYaw=0,this.sprintToggleTimer=0,this.flyToggleTimer=0,this.jumpTicks=0,this.autoJumpTime=0,this._prevForwardOK=!1,this._prevJump=!1,this.motionMultiplier=null,this.breaking=null,this.breakCooldown=0,this.useCooldown=0,this.usingItem=null,this.swingTime=0,this.swinging=!1,this.swingHand="main",this.swingProgress=0,this.prevSwingProgress=0,this.attackCooldown=0,this.ticksSinceAttack=100,this.itemCooldowns=new Map,this.shieldDisabled=0,this._lastHeld=null,this._lastHeldSig="",this.target=null,this.entityTarget=null,this.perspective=0,this.activeHand="main"}get gameMode(){return this.game.gameMode}get creative(){return this.game.gameMode==="creative"}get spectator(){return this.game.gameMode==="spectator"}get adventure(){return this.game.gameMode==="adventure"}get invulnerableMode(){return this.creative||this.spectator}get height(){return Ms[this.pose].height}get width(){return Mi}get aabb(){return ci.fromCenter(this.x,this.y,this.z,Mi/2,this.height)}get eyeY(){return this.y+this.eyeHeight}get reach(){return this.creative?5:4.5}get isBlocking(){let t=this.usingItem;return!!t&&t.stack&&t.stack.id==="shield"&&t.ticks>=5&&this.shieldDisabled<=0}lookDir(t=this.yaw,e=this.pitch){let i=Math.cos(e);return[-Math.sin(t)*i,Math.sin(e),-Math.cos(t)*i]}get mcYaw(){return 180-this.yaw/Ui}setPosition(t,e,i){this.x=this.prevX=t,this.y=this.prevY=e,this.z=this.prevZ=i,this.vx=this.vy=this.vz=0,this.fallDistance=0}teleport(t,e,i,n,r){this.setPosition(t,e,i),n!==void 0&&(this.yaw=n),r!==void 0&&(this.pitch=r)}intersectsBlock(t,e,i,n,r){let o=this.aabb;for(let a of ji(n,r,()=>0)){let l=new ci(t+a[0],e+a[1],i+a[2],t+a[3],e+a[4],i+a[5]);if(o.intersects(l))return!0}return!1}getHandStack(t="main"){return t==="off"?this.inventory.offhand.slots[0]:this.inventory.held}setHandStack(t,e){e&&e.count<=0&&(e=null),t==="off"?this.inventory.offhand.set(0,e):this.inventory.held=e}consumeHandItem(t="main",e=1){if(this.creative)return;let i=this.getHandStack(t);i&&(i.count-=e,i.count<=0?this.setHandStack(t,null):(t==="off"?this.inventory.offhand:this.inventory).changed())}giveItem(t){if(!t||t.count<=0)return;let e=this.inventory.addItem(t);e>0&&this.dropStack(t.clone(e))}update(t){let e=this.game.input,i=this.game;if(e.locked&&!this.dead){let[c,h]=e.takeMouseDelta(),f=(i.settings.sensitivity??.5)*.6+.2,u=f*f*f*8*.15*Ui;this.yaw-=c*u,this.pitch-=h*u*(i.settings.invertMouse?-1:1),this.pitch=vn(this.pitch,-Math.PI/2,Math.PI/2);let d=e.takeWheel();d&&this.selectSlot(((this.inventory.selected+d)%9+9)%9);for(let g=1;g<=9;g++)e.consume("Digit"+g)&&this.selectSlot(g-1);if(e.consume("perspective")&&(this.perspective=(this.perspective+1)%3),e.consume("drop")){let g=e.keys.has("ControlLeft")||e.keys.has("ControlRight")||e.keys.has("MetaLeft");this.dropHeld(g)}e.consume("swapHands")&&!this.spectator&&this.swapHands()}else e.takeMouseDelta(),e.takeWheel();if(!i.world)return;let[n,r,o]=this.lookDir();this.target=this.spectator||this.dead?null:i.world.raycast(this.x,this.eyeY,this.z,n,r,o,this.reach),this.entityTarget=this.spectator||this.dead?null:i.entities?.raycast?.(this.x,this.eyeY,this.z,n,r,o,this.creative?5:3,this.target?this.target.t:1/0)||null;let a=this.effects.get("night_vision"),l=0;a&&(l=a.ticks>200?1:.7+Math.sin((a.ticks-(i.accumulator/50||0))*Math.PI*.2)*.3),l!==this._nvApplied&&(i.chunkRenderer?.setUniform("uNightVision",l),this._nvApplied=l)}selectSlot(t){t!==this.inventory.selected&&(this.inventory.selected=t,this.inventory.changed())}swapHands(){let t=this.inventory,e=t.slots[t.selected],i=t.offhand.slots[0];t.slots[t.selected]=i||null,t.offhand.slots[0]=e||null,t.changed(),t.offhand.changed(),this.usingItem=null}tick(){let t=this.game;if(this.tickCount++,this.prevX=this.x,this.prevY=this.y,this.prevZ=this.z,this.prevYaw=this.yaw,this.prevPitch=this.pitch,this.prevEyeHeight=this.eyeHeight,this.prevWalkDist=this.walkDist,this.prevBob=this.bob,this.prevFov=this.fov,this.prevArmPitch=this.armPitch,this.prevArmYaw=this.armYaw,this.prevLimbSwingAmount=this.limbSwingAmount,this.prevBodyYaw=this.bodyYaw,this.prevSwingProgress=this.swingProgress,this.armPitch+=(this.pitch-this.armPitch)*.5,this.armYaw+=(this.yaw-this.armYaw)*.5,this.hurtTime>0&&this.hurtTime--,this.invulnerable>0&&this.invulnerable--,this.dead){this.deathTime++,this.vx=0,this.vz=0,this.onGround||(this.vy=(this.vy-.08)*.98,this.move(0,this.vy,0)),this.updateEyeHeight();return}if(this.sleeping){if(this.pose="sleeping",this.vx=this.vy=this.vz=0,this.fallDistance=0,this.sprinting=!1,this.usingItem=null,this.breaking=null,this.baseTick(),this.dead)return;this.tickEffects(),this.tickSurvival(),this.updateSwing(),this.updateEyeHeight(),this.ticksSinceAttack++;return}if(this.vehicle){if(this.readInput(),this.vx=this.vy=this.vz=0,this.fallDistance=0,this.sprinting=!1,this.pose!=="standing"&&(this.pose="standing"),this.baseTick(),this.dead)return;this.tickEffects(),this.tickCooldowns(),this.tickSurvival(),this.tickInteraction(),this.updateSwing(),this.updateEyeHeight(),this.ticksSinceAttack++;return}this.pose==="sleeping"&&(this.pose="standing"),this.readInput(),this.updateHeldChange(),this.updateSwimming(),this.updatePose(),this.baseTick(),!this.dead&&(this.tickEffects(),this.tickCooldowns(),this.sprinting&&!this.inWater&&!this.inLava&&this.pose!=="crouching"&&!this.spectator&&this.onGround&&this.runningEffect(),this.livingTick(),this.tickSurvival(),this.tickInteraction(),this.updateSwing(),this.updateAnimations(),this.updateEyeHeight(),this.ticksSinceAttack++)}readInput(){let t=this.game.input,e=t.locked&&!this.dead,i=0,n=0,r=!1,o=!1,a=!1;e&&(t.down("forward")&&(i+=1),t.down("back")&&(i-=1),t.down("left")&&(n+=1),t.down("right")&&(n-=1),r=t.down("jump"),o=t.down("sneak"),a=t.down("sprint")),this.jumpKey=r,this.autoJumpTime>0&&(this.autoJumpTime--,r=!0),this.jumping=r,this.sneakKey=o,this.sprintKey=a,this.sneaking=o&&!this.flying&&!this.spectator,this.rawForward=i,this.rawStrafe=n}updateHeldChange(){let t=this.inventory.held,e=t?`${t.id}|${t.count}|${t.damage}`:"";if(t!==this._lastHeld||e!==this._lastHeldSig){let i=this._lastHeldSig?this._lastHeldSig.split("|")[0]:"";(t?t.id:"")!==i&&this.resetCooldown(),this.breaking&&(t?t.id:void 0)!==this.breaking.item&&(this.breaking=null),this._lastHeld=t,this._lastHeldSig=e}}updateSwimming(){if(this.flying||this.spectator){this.swimming=!1;return}if(this.swimming)this.swimming=this.sprinting&&this.inWater;else{let t=Math.floor(this.x),e=Math.floor(this.y),i=Math.floor(this.z);this.swimming=this.sprinting&&this.headInWater&&Zi(this.game.world,t,e,i)==="water"}}poseBox(t){return ci.fromCenter(this.x,this.y,this.z,Mi/2,Ms[t].height)}isPoseClear(t){return gn(this.game.world,this.poseBox(t).shrink(1e-7))}updatePose(){if(this.spectator){this.pose="standing";return}if(this.sleeping){this.pose="sleeping";return}if(!this.isPoseClear("swimming"))return;let t=this.swimming?"swimming":this.sneaking?"crouching":"standing";this.isPoseClear(t)||(t=this.isPoseClear("crouching")?"crouching":"swimming"),this.pose=t}get forcedDown(){return this.pose==="crouching"||this.pose==="swimming"&&!this.inWater}baseTick(){let t=this.game,e=t.world;if(this.updateFluidState(),this.y<-64&&this.damage(4,"void"),!this.dead){if(this.invulnerableMode&&(this.fireTicks=0),this.fireTicks>0&&(this.fireTicks%20===0&&!this.inLava&&this.damage(1,"fire_tick"),this.fireTicks--),this.inLava&&(this.invulnerableMode||(this.fireTicks=Math.max(this.fireTicks,300*this.fireDurationFactor()),this.damage(4,"lava")),this.fallDistance*=.5),(this.inWater||this.isInRain())&&(this.fireTicks=0),!this.spectator&&!this.invulnerableMode){let i=Mi*.8/2,n=Math.floor(this.eyeY);for(let r=0;r<4;r++){let o=Math.floor(this.x+(r&1?i:-i)),a=Math.floor(this.z+(r&2?i:-i));if(oi[e.getBlock(o,n,a)]&&gt[e.getBlock(o,n,a)].solid){this.damage(1,"suffocation");break}}}if(this.headInWater&&!this.invulnerableMode){if(!this.effects.has("water_breathing")&&!this.effects.has("conduit_power")){let i=this.enchantLevel(this.inventory.armor.slots[0],"respiration");if(i>0&&Math.random()<1-1/(i+1)||this.air--,this.air===-20){this.air=0;for(let n=0;n<8;n++)t.particles?.spawn?.("bubble",this.x+Math.random()-.5,this.eyeY+Math.random()-.5,this.z+Math.random()-.5,this.vx,this.vy,this.vz);this.damage(2,"drown")}}}else this.air<this.maxAir&&(this.air=Math.min(this.maxAir,this.air+4))}}setFire(t){this.invulnerableMode||(this.fireTicks=Math.max(this.fireTicks,Math.ceil(t*20*this.fireDurationFactor())))}extinguish(){this.fireTicks=0}fireDurationFactor(){let t=0;for(let e of this.inventory.armor.slots)t=Math.max(t,this.enchantLevel(e,"fire_protection"));return t>0?1-Math.min(1,t*.15):1}enchantLevel(t,e){return t?.tag?.enchantments?.[e]||0}isInRain(){let t=this.game;if(!t.weather?.raining||!t.world)return!1;let e=t.world.getHeight(Math.floor(this.x),Math.floor(this.z));return this.y+this.height>=e}updateFluidState(){let t=this.game.world,e=this.aabb,i=!this.flying&&!this.spectator,n=Ia(t,e,"water",.014,this.vx,this.vz,i),r=this.inWater;this.inWater=n.touching&&!this.spectator,this.inWater&&!r&&this.tickCount>2&&this.splashEffect(),this.waterHeight=n.height,this.inWater&&(this.fallDistance=0,n.push&&(this.vx+=n.push[0],this.vy+=n.push[1],this.vz+=n.push[2]));let o=this.game.world.dimension==="nether",a=Ia(t,e,"lava",o?.007:.0023333333,this.vx,this.vz,i);this.inLava=a.touching&&!this.spectator,this.lavaHeight=a.height,this.inLava&&a.push&&(this.vx+=a.push[0],this.vy+=a.push[1],this.vz+=a.push[2]);let l=this.eyeY-.11111111,c=Math.floor(this.x),h=Math.floor(this.z),f=Math.floor(l),u=Zi(t,c,f,h);this.headInWater=!1,this.headInLava=!1,u&&!this.spectator&&f+Uc(t,c,f,h,u)>l&&(u==="water"?this.headInWater=!0:this.headInLava=!0);let d=Math.floor(this.x),g=Math.floor(this.y),_=Math.floor(this.z),m=gt[t.getBlock(d,g,_)];this.onLadder=!this.spectator&&(!!m.climbable||m.shape==="trapdoor"&&t.getMeta(d,g,_)&4&&gt[t.getBlock(d,g-1,_)].name==="ladder")}splashEffect(){let t=this.game,e=Math.min(1,Math.sqrt(this.vx*this.vx*.2+this.vy*this.vy+this.vz*this.vz*.2)*.2);t.audio?.play?.(e<.25?"random.splash":"liquid.splash",{x:this.x,y:this.y,z:this.z,volume:Math.max(.1,e),pitch:1+(Math.random()-Math.random())*.4});let i=Math.floor(this.y)+1,n=1+Mi*20;for(let r=0;r<n;r++){let o=(Math.random()*2-1)*Mi,a=(Math.random()*2-1)*Mi;t.particles?.spawn?.("bubble",this.x+o,i,this.z+a,this.vx,this.vy-Math.random()*.2,this.vz),t.particles?.spawn?.("splash",this.x+(Math.random()*2-1)*Mi,i,this.z+(Math.random()*2-1)*Mi,this.vx,this.vy,this.vz)}t.events.emit("splash",{entity:this,strength:e})}runningEffect(){let t=this.game.world,e=Math.floor(this.x),i=Math.floor(this.y-.2),n=Math.floor(this.z),r=t.getBlock(e,i,n);!r||gt[r].shape==="none"||gt[r].liquid||this.game.particles?.spawn?.("block",this.x+(Math.random()-.5)*Mi,this.y+.1,this.z+(Math.random()-.5)*Mi,this.vx*-4,1.5,this.vz*-4,{blockId:r,meta:t.getMeta(e,i,n)})}livingTick(){let t=this.game,e=this.rawForward,i=this.rawStrafe;this.forcedDown&&(e*=.3,i*=.3),this.usingItem&&(e*=.2,i*=.2,this.sprintToggleTimer=0),this.sprintToggleTimer>0&&this.sprintToggleTimer--;let n=e>=.8,r=this.food>6||this.creative||this.spectator,o=this.effects.has("blindness");if((this.onGround||this.headInWater)&&!this.sneaking&&!this._prevForwardOK&&n&&!this.sprinting&&r&&!this.usingItem&&!o&&(this.sprintToggleTimer<=0&&!this.sprintKey?this.sprintToggleTimer=7:this.sprinting=!0),!this.sprinting&&(!this.inWater||this.headInWater)&&n&&r&&!this.usingItem&&!o&&this.sprintKey&&(this.sprinting=!0),this.sprinting){let u=!n||!r,d=u||this.collidedH||this.inWater&&!this.headInWater&&!this.swimming;this.swimming?(!this.onGround&&!this.sneakKey&&u||!this.inWater)&&(this.sprinting=!1):d&&(this.sprinting=!1)}if(this._prevForwardOK=n,this.spectator?this.flying=!0:this.creative?!this._prevJump&&this.jumpKey&&(this.flyToggleTimer===0?this.flyToggleTimer=7:this.swimming||(this.flying=!this.flying,this.flyToggleTimer=0)):this.flying=!1,this._prevJump=this.jumpKey,this.flyToggleTimer>0&&this.flyToggleTimer--,this.inWater&&this.sneakKey&&!this.flying&&(this.vy-=.04),this.flying){let u=0;this.sneakKey&&u--,this.jumpKey&&u++,u&&(this.vy+=u*.05*3)}let a=this.onGround&&!this.swimming?Math.min(.1,Math.hypot(this.vx,this.vz)):0;if(this.bob+=(a-this.bob)*.4,this.jumpTicks>0&&this.jumpTicks--,Math.abs(this.vx)<.003&&(this.vx=0),Math.abs(this.vy)<.003&&(this.vy=0),Math.abs(this.vz)<.003&&(this.vz=0),this.jumping&&!this.flying){let u=this.inLava?this.lavaHeight:this.waterHeight,d=this.inWater&&u>0,g=this.eyeHeight<.4?0:.4;!d||this.onGround&&!(u>g)?this.inLava&&(!this.onGround||u>g)?this.vy+=.04:(this.onGround||d&&u<=g)&&this.jumpTicks===0&&(this.jump(),this.jumpTicks=10):this.vy+=.04}else this.jumpTicks=0;e*=.98,i*=.98,this.moveForward=e,this.moveStrafe=i;let l=this.x,c=this.y,h=this.z;this.travel(i,e),this.addMovementStat(this.x-l,this.y-c,this.z-h),this.onGround&&this.flying&&!this.spectator&&(this.flying=!1);let f=1;if(this.flying&&(f*=1.1),f*=(this.getMoveSpeed()/.1+1)/2,this.usingItem&&this.usingItem.stack?.id==="bow"){let u=this.usingItem.ticks/20;u=u>1?1:u*u,f*=1-u*.15}this.usingItem&&this.usingItem.stack?.id==="spyglass"&&(f=.1),this.fov+=(vn(f,.1,1.5)-this.fov)*.5}jump(){let t=this.game,e=this.effects.get("jump_boost"),i=.42*this.jumpFactor();e&&(i+=.1*(e.amp+1)),this.vy=i,this.sprinting?(this.vx+=-Math.sin(this.yaw)*.2,this.vz+=-Math.cos(this.yaw)*.2,this.exhaust(.2)):this.exhaust(.05),t.events.emit("playerJump",{entity:this})}jumpFactor(){let t=this.game.world,e=gt[t.getBlock(Math.floor(this.x),Math.floor(this.y),Math.floor(this.z))];return e.jumpFactor!==void 0&&e.jumpFactor!==1?e.jumpFactor:gt[t.getBlock(Math.floor(this.x),Math.floor(this.y-.5000001),Math.floor(this.z))].jumpFactor??1}getMoveSpeed(){let t=.1;this.sprinting&&(t*=1.3);let e=this.effects.get("speed");e&&(t*=1+.2*(e.amp+1));let i=this.effects.get("slowness");return i&&(t*=Math.max(0,1-.15*(i.amp+1))),t}moveRelative(t,e,i){let n=t*t+e*e;if(n<1e-7)return;n>1&&(n=Math.sqrt(n),t/=n,e/=n),t*=i,e*=i;let r=Math.sin(this.yaw),o=Math.cos(this.yaw);this.vx+=-e*r-t*o,this.vz+=-e*o+t*r}travel(t,e){if(!(this.elytraTravel&&this.elytraTravel(t,e))){if(this.spectator){let i=this.vy;this.livingTravel(t,e,.05*(this.sprinting?2:1),!0),this.vy=i*.6,this.fallDistance=0;return}if(this.swimming){let i=this.lookDir()[1],n=i<-.2?.085:.06,r=this.game.world,o=gt[r.getBlock(Math.floor(this.x),Math.floor(this.y+1-.1),Math.floor(this.z))].liquid==="water";(i<=0||this.jumping||o)&&(this.vy+=(i-this.vy)*n)}if(this.flying){let i=this.vy;this.livingTravel(t,e,.05*(this.sprinting?2:1),!0),this.vy=i*.6,this.fallDistance=0;return}this.livingTravel(t,e,this.sprinting?.026:.02,!1)}}livingTravel(t,e,i,n){let r=this.game.world,o=.08,a=this.vy<=0;a&&this.effects.has("slow_falling")&&(o=.01,this.fallDistance=0);let l=()=>{this.sprinting||(this.vy=a&&Math.abs(this.vy-.005)>=.003&&Math.abs(this.vy-o/16)<.003?-.003:this.vy-o/16)};if(this.inWater&&!n){let _=this.y,m=this.sprinting?.9:.8,p=.02,S=this.enchantLevel(this.inventory.armor.slots[3],"depth_strider");S>3&&(S=3),this.onGround||(S*=.5),S>0&&(m+=(.54600006-m)*S/3,p+=(this.getMoveSpeed()-p)*S/3),this.effects.has("dolphins_grace")&&(m=.96),this.moveRelative(t,e,p),this.move(this.vx,this.vy,this.vz),this.collidedH&&this.onLadder&&(this.vy=.2),this.vx*=m,this.vy*=.8,this.vz*=m,l(),this.collidedH&&this.isOffsetFreeOfLiquid(this.vx,this.vy+.6-this.y+_,this.vz)&&(this.vy=.3);return}if(this.inLava&&!n){let _=this.y;this.moveRelative(t,e,.02),this.move(this.vx,this.vy,this.vz),this.lavaHeight<=(this.eyeHeight<.4?0:.4)?(this.vx*=.5,this.vy*=.8,this.vz*=.5,l()):(this.vx*=.5,this.vy*=.5,this.vz*=.5),this.vy-=o/4,this.collidedH&&this.isOffsetFreeOfLiquid(this.vx,this.vy+.6-this.y+_,this.vz)&&(this.vy=.3);return}let h=gt[r.getBlock(Math.floor(this.x),Math.floor(this.y-.5000001),Math.floor(this.z))].friction??.6,f=this.onGround?h*.91:.91,u=this.onGround&&!n?this.getMoveSpeed()*(.21600002/(h*h*h)):i;this.moveRelative(t,e,u),this.onLadder&&!n&&(this.fallDistance=0,this.vx=vn(this.vx,-.15,.15),this.vz=vn(this.vz,-.15,.15),this.vy=Math.max(this.vy,-.15),this.vy<0&&this.sneaking&&(this.vy=0)),this.move(this.vx,this.vy,this.vz),(this.collidedH||this.jumping)&&this.onLadder&&!n&&(this.vy=.2);let d=this.vy,g=this.effects.get("levitation");g?(d+=(.05*(g.amp+1)-this.vy)*.2,this.fallDistance=0):this.game.world.getChunkAt(Math.floor(this.x),Math.floor(this.z))?d-=o:d=this.y>0?-.1:0,this.vx*=f,this.vy=d*.98,this.vz*=f}isOffsetFreeOfLiquid(t,e,i){let n=this.aabb.offset(t,e,i);return gn(this.game.world,n)?!Sf(this.game.world,n,r=>!!r.liquid):!1}move(t,e,i){let n=this.game.world;if(this.spectator){this.x+=t,this.y+=e,this.z+=i,this.onGround=!1,this.collidedH=!1,this.collidedV=!1;return}if(this.motionMultiplier){let g=this.motionMultiplier;t*=g[0],e*=g[1],i*=g[2],this.motionMultiplier=null,this.vx=this.vy=this.vz=0}if(this.sneaking&&!this.flying&&e<=0&&(this.onGround||this.fallDistance<.6&&!gn(n,this.aabb.offset(0,this.fallDistance-.6,0)))){let g=this.aabb,_=(p,S)=>gn(n,g.moved(p,-.6,S)),m=p=>p<.05&&p>=-.05?0:p>0?p-.05:p+.05;for(;t!==0&&_(t,0);)t=m(t);for(;i!==0&&_(0,i);)i=m(i);for(;t!==0&&i!==0&&_(t,i);)t=m(t),i=m(i)}let r=this.aabb,o=this.onGround,a=Mf(n,r,t,e,i,.6,this.onGround);this.x=(r.x0+r.x1)/2,this.y=r.y0,this.z=(r.z0+r.z1)/2,this.collidedH=a.collidedH,this.collidedV=a.collidedY,this.onGround=a.onGround;let l=Math.floor(this.x),c=Math.floor(this.y-.2),h=Math.floor(this.z),f=gt[n.getBlock(l,c,h)];if(f.id===0){let g=gt[n.getBlock(l,c-1,h)];(g.shape==="fence"||g.shape==="wall"||g.shape==="fence_gate")&&(c--,f=g)}if(this.fallDistance>0&&!this.inWater&&Ia(n,this.aabb,"water",0,0,0,!1).touching&&(this.inWater=!0,this.fallDistance=0),this.onGround?(this.fallDistance>0&&this.onLand(this.fallDistance,f,l,c,h),this.fallDistance=0):a.dy<0&&(this.fallDistance-=a.dy),a.collidedX&&(this.vx=0),a.collidedZ&&(this.vz=0),a.collidedY&&(Cf(f,this,!0,this.sneaking)||(this.vy=0)),!this.flying){let g=Math.hypot(a.dx,a.dz),_=this.onLadder?a.dy:0;if(this.walkDist+=g*.6,this.stepDist+=Math.hypot(a.dx,_,a.dz)*.6,this.stepDist>this.nextStepDist&&f.id!==0&&(this.nextStepDist=Math.floor(this.stepDist)+1,!this.sneaking||this.inWater)){let m=gt[n.getBlock(Math.floor(this.x),Math.floor(this.y),Math.floor(this.z))],p=this.inWater?gt[Re.water]:m.climbable||m.shape==="snow_layer"||m.shape==="carpet"?m:f;this.game.events.emit("footstep",{entity:this,block:p,x:this.x,y:this.y,z:this.z,swimming:this.inWater})}}if(this.onGround&&!this.sneaking){f.name==="magma_block"&&!this.effects.has("fire_resistance")&&!this.enchantLevel(this.inventory.armor.slots[3],"frost_walker")&&this.damage(1,"hot_floor");let g=fi(f.name);g?.onStep&&g.onStep(this.game,l,c,h,this),Rf(f,this,!1)}this.checkInsideBlocks();let u=gt[n.getBlock(Math.floor(this.x),Math.floor(this.y),Math.floor(this.z))],d=u.speedFactor??1;if(d===1&&!u.liquid&&(d=gt[n.getBlock(Math.floor(this.x),Math.floor(this.y-.5000001),Math.floor(this.z))].speedFactor??1),u.name==="cobweb"&&(d=1),d!==1&&(this.vx*=d,this.vz*=d),this.game.settings.autoJump&&o&&this.onGround&&a.collidedH&&!this.sneaking&&!this.flying&&this.rawForward>0&&this.autoJumpTime===0){let g=Math.hypot(t,i)||1,_=t/g*.3,m=i/g*.3,p=this.aabb,S=this.effects.get("jump_boost"),E=1.2+(S?(S.amp+1)*.75:0);if(!gn(n,p.moved(_,0,m))&&gn(n,p.moved(0,E,0))){for(let y=.61;y<=E;y+=.1)if(gn(n,p.moved(_,y,m))){this.autoJumpTime=1;break}}}!o&&this.onGround&&this.game.events.emit("land",{entity:this})}checkInsideBlocks(){let t=this.game.world,e=this.aabb.shrink(.001),i=Math.floor(e.x0),n=Math.floor(e.x1),r=Math.floor(e.y0),o=Math.floor(e.y1),a=Math.floor(e.z0),l=Math.floor(e.z1);this.inWeb=!1;for(let c=i;c<=n;c++)for(let h=r;h<=o;h++)for(let f=a;f<=l;f++){let u=t.getBlock(c,h,f);if(!u)continue;let d=gt[u];d.name==="cobweb"?(this.inWeb=!0,this.motionMultiplier=[.25,.05,.25],this.fallDistance=0):d.name==="fire"||d.name==="soul_fire"?(this.invulnerableMode||(this.fireTicks=Math.max(this.fireTicks+1,Math.ceil(160*this.fireDurationFactor()))),this.damage(d.name==="soul_fire"?2:1,"fire")):d.name==="cactus"?this.damage(1,"cactus"):d.name==="sweet_berry_bush"?(this.motionMultiplier=[.8,.75,.8],this.fallDistance=0):u===Re.honey_block&&!this.flying&&kc(this,c,h,f,.6);let g=fi(d.name);g?.onEntityCollide&&g.onEntityCollide(this.game,c,h,f,this)}}onLand(t,e,i,n,r){let[o,a]=If(e,this.sneaking);t*=o,fi(e.name)?.onFallOn?.(this.game,i,n,r,this,t);let c=this.effects.get("jump_boost"),h=Math.ceil((t-3-(c?c.amp+1:0))*a);h>0&&(this.game.audio?.play?.(h>4?"damage.fallbig":"damage.fallsmall",{x:this.x,y:this.y,z:this.z}),this.damage(h,"fall",null,{distance:t})),(t>.5||h>0)&&this.game.events.emit("fall",{entity:this,distance:t,damage:Math.max(0,h),block:e,x:i,y:n,z:r})}updateEyeHeight(){let t=this.dead?Ms.standing.eye:Ms[this.pose].eye;this.eyeHeight+=(t-this.eyeHeight)*.5}addMovementStat(t,e,i){if(!(this.flying||this.spectator)){if(this.swimming||this.headInWater){let n=Math.round(Math.hypot(t,e,i)*100);n>0&&this.exhaust(.01*n*.01)}else if(this.inWater){let n=Math.round(Math.hypot(t,i)*100);n>0&&this.exhaust(.01*n*.01)}else if(this.onGround&&this.sprinting){let n=Math.round(Math.hypot(t,i)*100);n>0&&this.exhaust(.1*n*.01)}}}exhaust(t){this.invulnerableMode||(this.exhaustion=Math.min(40,this.exhaustion+t))}heal(t){this.dead||t<=0||(this.health=Math.min(this.maxHealth,this.health+t))}addFood(t,e){this.food=Math.min(20,this.food+t),this.saturation=Math.min(this.saturation+e,this.food)}canEat(t=!1){return this.creative||t||this.food<20}damage(t,e="generic",i=null,n={}){if(this.dead)return!1;if(e==="kill")return this.health=0,this.absorption=0,this.game.events.emit("playerHurt",{amount:t,raw:t,cause:e,source:i}),this.die(e,i,n),!0;let r=e==="void";if(this.spectator&&e!=="void"&&e!=="kill"||this.creative&&!r||Ua.has(e)&&this.effects.has("fire_resistance"))return!1;if(hx.has(e)||n.scaled){let c=this.game.difficulty??2;c===0?t=0:c===1?t=Math.min(t/2+1,t):c===3&&(t=t*3/2)}if(t<=0)return!1;let o=n.direct&&n.direct.x!==void 0?n.direct:i;if(this.isBlocking&&!Uf.has(e)&&!Ua.has(e)&&o&&o.x!==void 0){let[c,,h]=this.lookDir(),f=this.x-o.x,u=this.z-o.z,d=Math.hypot(f,u)||1;if(f/=d,u/=d,f*c+u*h<0)return t>=3&&this.damageShield(1+Math.floor(t)),this.game.audio?.play?.("item.shield.block",{x:this.x,y:this.y,z:this.z}),this.game.events.emit("shieldBlock",{amount:t,cause:e,source:i}),i&&n.disableShield?this.disableShield(100):i&&i.isLiving!==!1&&i.vx!==void 0&&e!=="arrow"&&e!=="explosion"&&i.knockback?.(.5,this.x-i.x,this.z-i.z),!1}let a,l=!0;if(this.invulnerable>10){if(t<=this.lastDamage)return!1;a=this.applyDamage(t-this.lastDamage,e),this.lastDamage=t,l=!1}else this.lastDamage=t,this.invulnerable=20,a=this.applyDamage(t,e),this.hurtTime=this.maxHurtTime=10;if(l){if(i&&i.x!==void 0){let c=i.x-this.x,h=i.z-this.z;if(this.attackedAtYaw=Math.atan2(h,c)/Ui-this.mcYaw,!n.noKnockback){let f=c,u=h;for(;f*f+u*u<1e-4;)f=(Math.random()-Math.random())*.01,u=(Math.random()-Math.random())*.01;this.knockback(n.knockback??.4,f,u)}}else this.attackedAtYaw=Math.floor(Math.random()*2)*180;this.game.audio?.play?.(e==="drown"?"entity.player.hurt_drown":Ua.has(e)&&e!=="lava"?"entity.player.hurt_on_fire":"random.hurt",{x:this.x,y:this.y,z:this.z,volume:1,pitch:(Math.random()-Math.random())*.2+1})}return this.game.events.emit("playerHurt",{amount:a,raw:t,cause:e,source:i}),this.health<=0&&this.die(e,i,n),!0}knockback(t,e,i){let n=0;for(let l of this.inventory.armor.slots)l&&re[l.id]?.armor?.material==="netherite"&&(n+=.1);if(t*=1-n,t<=0)return;let r=Math.hypot(e,i)||1,o=e/r*t,a=i/r*t;this.vx=this.vx/2-o,this.vz=this.vz/2-a,this.onGround&&(this.vy=Math.min(.4,this.vy/2+t))}applyDamage(t,e){let i=Uf.has(e);if(!i){let{points:o,toughness:a}=this.armorValues();this.damageArmor(t);let l=2+a/4,c=vn(o-t/l,o*.2,20);t*=1-c/25}let n=this.effects.get("resistance");if(n&&e!=="void"&&e!=="kill"&&(t=Math.max(0,t*(25-(n.amp+1)*5)/25)),t>0&&e!=="void"&&e!=="kill"&&e!=="starve"){let o=0;for(let a of this.inventory.armor.slots){let l=a?.tag?.enchantments;l&&(l.protection&&(o+=l.protection),l.fire_protection&&Ua.has(e)&&(o+=l.fire_protection*2),l.blast_protection&&e==="explosion"&&(o+=l.blast_protection*2),l.projectile_protection&&e==="arrow"&&(o+=l.projectile_protection*2),l.feather_falling&&e==="fall"&&(o+=l.feather_falling*3))}o=Math.min(20,o),o>0&&(t*=1-o/25)}let r=t;if(this.absorption>0){let o=Math.min(this.absorption,t);this.absorption-=o,t-=o}return t>0&&(this.health=Math.max(0,this.health-t)),i||this.exhaust(.1),r}armorValues(){let t=0,e=0;for(let i of this.inventory.armor.slots){let n=i&&re[i.id]?.armor;n&&(t+=n.points,e+=n.toughness)}return{points:t,toughness:e}}get armorPoints(){return this.armorValues().points}damageArmor(t){let e=Math.max(1,Math.floor(t/4)),i=this.inventory.armor,n=!1;for(let r=0;r<4;r++){let o=i.slots[r];if(!o||!re[o.id]?.armor||!re[o.id]?.durability||re[o.id].armor.hidden)continue;let a=this.enchantLevel(o,"unbreaking"),l=0;for(let c=0;c<e;c++)a>0&&Math.random()>=.6&&Math.floor(Math.random()*(a+1))>0||l++;o.damage+=l,n=!0,o.damage>=re[o.id].durability&&(i.slots[r]=null,this.game.events.emit("itemBreak",{stack:o,player:this}),this.breakSound())}n&&i.changed()}breakSound(){this.game.audio?.play?.("random.break",{x:this.x,y:this.y,z:this.z,volume:.8,pitch:.8+Math.random()*.4})}damageShield(t){let e=this.usingItem?.hand||"main",i=this.getHandStack(e);!i||i.id!=="shield"||this.creative||(i.damage+=t,i.damage>=(re.shield?.durability||336)?(this.setHandStack(e,null),this.usingItem=null,this.game.events.emit("itemBreak",{stack:i,player:this}),this.breakSound()):(e==="off"?this.inventory.offhand:this.inventory).changed())}disableShield(t=100){this.shieldDisabled=t,this.setCooldown("shield",t),this.usingItem=null,this.game.audio?.play?.("item.shield.break",{x:this.x,y:this.y,z:this.z})}die(t,e,i={}){if(!this.dead){if(this.dead=!0,this.health=0,this.deathTime=0,this.deathCause=t,this.deathMessage=px(t,e,i,this),this.usingItem=null,this.breaking=null,this.sprinting=!1,this.flying=!1,this.game.events.emit("playerDeath",{cause:t,source:e,message:this.deathMessage}),this.game.ui?.chat?.(this.deathMessage),!this.game.gameRules?.keepInventory){let n=[];for(let o of[this.inventory,this.inventory.armor,this.inventory.offhand]){for(let a=0;a<o.size;a++)o.slots[a]&&(o.slots[a].tag?.enchantments?.vanishing_curse||n.push(o.slots[a]),o.slots[a]=null);o.changed()}for(let o of n)this.game.entities?.spawnItem?.(o,this.x,this.eyeY-.3,this.z,!0);let r=Math.min(this.xpLevel*7,100);r>0&&!this.spectator&&this.game.entities?.spawnXP?.(this.x,this.y+.5,this.z,r),this.xpLevel=0,this.xpProgress=0,this.xpTotal=0}this.game.input.exitLock()}}setSpawnPoint(t,e,i,n={}){this.spawnPoint=t==null?null:{x:t,y:e,z:i,...n}}findRespawn(){let t=this.game.world,e=this.spawnPoint;if(e&&t){let a=Math.floor(e.x),l=Math.floor(e.y),c=Math.floor(e.z),h=null;for(let f=0;f>=-1&&!h;f--)for(let u=-1;u<=1&&!h;u++)for(let d=-1;d<=1&&!h;d++)gt[t.getBlock(a+u,l+f,c+d)].shape==="bed"&&(h=[a+u,l+f,c+d]);if(e.forced&&!h)return{x:e.x,y:e.y,z:e.z};if(h){for(let f=1;f<=2;f++)for(let u=-f;u<=f;u++)for(let d=-f;d<=f;d++)for(let g of[0,1,-1]){let _=h[0]+u,m=h[1]+g,p=h[2]+d;if(this.canStandAt(_,m,p))return{x:_+.5,y:m,z:p+.5}}return{x:h[0]+.5,y:h[1]+.5625,z:h[2]+.5}}this.game.ui?.chat?.("You have no home bed or charged respawn anchor, or it was obstructed"),this.spawnPoint=null}let i=this.game.worldSpawn||{x:.5,y:100,z:.5},{x:n,y:r,z:o}=i;if(t){let a=Math.floor(r);for(let l=0;l<64&&a<255&&!this.canFitAt(Math.floor(n),a,Math.floor(o));l++)a++;r=Math.max(r,a)}return{x:n,y:r,z:o}}canFitAt(t,e,i){let n=this.game.world;return!Se[n.getBlock(t,e,i)]&&!Se[n.getBlock(t,e+1,i)]&&!gt[n.getBlock(t,e,i)].liquid}canStandAt(t,e,i){let n=this.game.world,r=n.getBlock(t,e-1,i);return this.canFitAt(t,e,i)&&Se[r]&&gt[r].shape!=="bed"&&!gt[n.getBlock(t,e,i)].liquid&&gt[r].name!=="magma_block"&&gt[n.getBlock(t,e,i)].name!=="fire"}respawn(){let t=this.findRespawn();this.dead=!1,this.deathTime=0,this.health=this.maxHealth=20,this.food=20,this.saturation=5,this.exhaustion=0,this.foodTimer=0,this.air=this.maxAir,this.fireTicks=0,this.absorption=0,this.hurtTime=0,this.invulnerable=0,this.lastDamage=0,this.effects.clear(),this.pose="standing",this.eyeHeight=this.prevEyeHeight=Gc,this.usingItem=null,this.breaking=null,this.flying=this.spectator,this.setPosition(t.x,t.y,t.z),this.game.events.emit("playerRespawn",{x:t.x,y:t.y,z:t.z})}tickSurvival(){if(this.invulnerableMode){this.exhaustion=0;return}let t=this.game.difficulty??2,e=this.game.gameRules?.naturalRegeneration!==!1;this.exhaustion>4&&(this.exhaustion-=4,this.saturation>0?this.saturation=Math.max(0,this.saturation-1):t>0&&(this.food=Math.max(0,this.food-1)));let i=this.health>0&&this.health<this.maxHealth;if(e&&this.saturation>0&&i&&this.food>=20){if(++this.foodTimer>=10){let n=Math.min(this.saturation,6);this.heal(n/6),this.exhaust(n),this.foodTimer=0}}else e&&this.food>=18&&i?++this.foodTimer>=80&&(this.heal(1),this.exhaust(6),this.foodTimer=0):this.food<=0?++this.foodTimer>=80&&((this.health>10||t>=3||this.health>1&&t===2)&&this.damage(1,"starve"),this.foodTimer=0):this.foodTimer=0;t===0&&e&&(this.health<this.maxHealth&&this.tickCount%20===0&&this.heal(1),this.food<20&&this.tickCount%10===0&&this.food++)}tickEffects(){for(let[t,e]of this.effects){if(e.ticks>0){let i=e.ticks;switch(t){case"regeneration":{let n=50>>e.amp;(!(n>0)||i%n===0)&&this.health<this.maxHealth&&this.heal(1);break}case"poison":{let n=25>>e.amp;(!(n>0)||i%n===0)&&this.health>1&&this.damage(1,"magic");break}case"wither":{let n=40>>e.amp;(!(n>0)||i%n===0)&&this.damage(1,"wither");break}case"hunger":this.exhaust(.005*(e.amp+1));break;case"saturation":this.invulnerableMode||this.addFood(e.amp+1,(e.amp+1)*2);break}if(this.dead)return;e.ticks--}e.ticks<=0&&this.removeEffect(t)}this.effects.has("health_boost")?this.maxHealth=20+4*(this.effects.get("health_boost").amp+1):this.maxHealth!==20&&(this.maxHealth=20,this.health=Math.min(this.health,20))}addEffect(t,e,i=0,n={}){if(this.dead)return!1;let r=oh[t];if(t==="instant_health")return this.heal(Math.max(4<<i,0)),!0;if(t==="instant_damage")return this.damage(6<<i,"magic"),!0;if(r?.instant)return!0;let o=this.effects.get(t);return(!o||i>o.amp||i===o.amp&&o.ticks<e)&&(t==="absorption"&&(this.absorption=Math.max(this.absorption,4*(i+1))),this.effects.set(t,{amp:i,ticks:e,ambient:!!n.ambient,particles:n.particles!==!1}),this.game.events.emit("effectAdded",{name:t,amp:i,ticks:e,entity:this})),!0}removeEffect(t){let e=this.effects.get(t);e&&(this.effects.delete(t),t==="absorption"&&(this.absorption=Math.max(0,this.absorption-4*(e.amp+1))),t==="night_vision"&&(this.game.chunkRenderer?.setUniform("uNightVision",0),this._nvApplied=0),this.game.events.emit("effectRemoved",{name:t,entity:this}))}clearEffects(){for(let t of[...this.effects.keys()])this.removeEffect(t)}hasEffect(t){return this.effects.has(t)}effectAmp(t){let e=this.effects.get(t);return e?e.amp:-1}addXP(t){for(this.xpTotal=Math.max(0,this.xpTotal+t),this.xpProgress+=t/this.xpToNext();this.xpProgress<0;){let e=this.xpProgress*this.xpToNext();this.xpLevel>0?(this.addLevels(-1),this.xpProgress=1+e/this.xpToNext()):(this.addLevels(-1),this.xpProgress=0)}for(;this.xpProgress>=1;)this.xpProgress=(this.xpProgress-1)*this.xpToNext(),this.addLevels(1),this.xpProgress/=this.xpToNext();this.game.events.emit("xp",{amount:t})}addLevels(t){this.xpLevel=Math.max(0,this.xpLevel+t),this.xpLevel<0&&(this.xpLevel=0,this.xpProgress=0,this.xpTotal=0),t>0&&this.xpLevel%5===0&&(this._lastXPSound??-1e3)<this.tickCount-100&&(this._lastXPSound=this.tickCount,this.game.audio?.play?.("random.levelup",{x:this.x,y:this.y,z:this.z,volume:(this.xpLevel>30?1:this.xpLevel/30)*.75,pitch:1})),t>0&&this.game.events.emit("levelUp",{level:this.xpLevel})}xpToNext(){let t=this.xpLevel;return t>=30?112+(t-30)*9:t>=15?37+(t-15)*5:7+t*2}getAttackSpeed(){let t=this.inventory.held,e=t?re[t.id]?.attackSpeed??4:4,i=this.effects.get("haste");i&&(e*=1+.1*(i.amp+1));let n=this.effects.get("mining_fatigue");return n&&(e*=Math.max(0,1-.1*(n.amp+1))),e}getAttackStrength(t=.5){let e=20/this.getAttackSpeed();return vn((this.ticksSinceAttack+t)/e,0,1)}getAttackDamage(){let t=this.inventory.held,e=t?re[t.id]?.attackDamage??1:1,i=this.effects.get("strength");i&&(e+=3*(i.amp+1));let n=this.effects.get("weakness");return n&&(e-=4*(n.amp+1)),Math.max(0,e)}resetCooldown(){this.ticksSinceAttack=0}setCooldown(t,e){this.itemCooldowns.set(t,{ticks:e,total:e})}getCooldown(t,e=0){let i=this.itemCooldowns.get(t);return i?vn((i.ticks-e)/i.total,0,1):0}tickCooldowns(){for(let[t,e]of this.itemCooldowns)--e.ticks<=0&&this.itemCooldowns.delete(t);this.shieldDisabled>0&&this.shieldDisabled--}swing(t="main"){let e=this.swingDuration();(!this.swinging||this.swingTime>=Math.floor(e/2)||this.swingTime<0)&&(this.swingTime=-1,this.swinging=!0,this.swingHand=t)}swingDuration(){let t=this.effects.get("haste"),e=this.effects.get("mining_fatigue");return t?6-(1+t.amp):e?6+(1+e.amp)*2:6}updateSwing(){let t=this.swingDuration();this.swinging?(this.swingTime++,this.swingTime>=t&&(this.swingTime=0,this.swinging=!1)):this.swingTime=0,this.swingProgress=this.swingTime/t}getSwingProgress(t){let e=this.swingProgress-this.prevSwingProgress;return e<0&&(e+=1),this.prevSwingProgress+e*t}updateAnimations(){let t=this.x-this.prevX,e=this.z-this.prevZ,i=Math.hypot(t,e)*4;i>1&&(i=1),this.flying&&(i=0),this.limbSwingAmount+=(i-this.limbSwingAmount)*.4,this.limbSwing+=this.limbSwingAmount;let n=this.mcYaw,r=this.bodyYaw;t*t+e*e>.0025000002&&(r=Math.atan2(e,t)/Ui-90),this.swingProgress>0&&(r=n),this.bodyYaw+=Ff(r-this.bodyYaw)*.3;let o=Ff(n-this.bodyYaw);for(o=vn(o,-75,75),this.bodyYaw=n-o,o*o>2500&&(this.bodyYaw+=o*.2);this.bodyYaw-this.prevBodyYaw<-180;)this.prevBodyYaw-=360;for(;this.bodyYaw-this.prevBodyYaw>=180;)this.prevBodyYaw+=360}digSpeed(t){if(t.hardness<0)return 0;let e=this.inventory.held,i=e?re[e.id]:null,n=1;if(i&&i.toolType&&t.tool===i.toolType&&i.toolTier&&(n=nh[i.toolTier].speed),i&&i.toolType==="shears"&&(t.name==="cobweb"||t.leaves?n=15:t.name.endsWith("_wool")?n=5:t.name==="vine"&&(n=2)),i&&i.toolType==="sword"&&(t.name==="cobweb"?n=15:(t.leaves||["cross","double_plant","vine","crop","stem"].includes(t.shape)||["pumpkin","carved_pumpkin","jack_o_lantern","melon","cocoa"].includes(t.name))&&(n=1.5)),n>1){let h=this.enchantLevel(e,"efficiency");h&&(n+=h*h+1)}let o=this.effects.get("haste")||this.effects.get("conduit_power");o&&(n*=1+.2*(o.amp+1));let a=this.effects.get("mining_fatigue");if(a&&(n*=[.3,.09,.0027,81e-5][Math.min(3,a.amp)]),this.headInWater&&!this.enchantLevel(this.inventory.armor.slots[0],"aqua_affinity")&&(n/=5),this.onGround||(n/=5),t.hardness===0)return 1/0;let l=this.canHarvest(t),c=Math.fround;return c(c(c(n)/c(t.hardness))/(l?30:100))}canHarvest(t){if(t.toolLevel<0&&t.name!=="cobweb")return!0;let e=this.inventory.held,i=e?re[e.id]:null;return t.name==="cobweb"?!!i&&(i.toolType==="sword"||i.toolType==="shears"):!i||i.toolType!==t.tool?!1:(ih[i.toolTier]??-1)>=t.toolLevel}tickInteraction(){let t=this.game,e=t.input;if(this.breakCooldown>0&&this.breakCooldown--,this.useCooldown>0&&this.useCooldown--,!e.locked||this.spectator){this.breaking=null,this.usingItem&&this.stopUsingItem(),this._leftClicked=!1,this._rightClicked=!1;return}let i=e.mouseButtons.has(0),n=e.mouseButtons.has(2);if(this.usingItem){let r=this.usingItem,o=this.getHandStack(r.hand);!n||!o||o!==r.stack||r.hand==="main"&&this.inventory.selected!==r.slot?this.stopUsingItem():(r.ticks++,r.beh?.onUseTick?.(t,this,o,r.ticks,r.hand),r.duration&&r.ticks>=r.duration&&this.usingItem===r&&(this.usingItem=null,r.beh?.onFinishUse?.(t,this,o,r.hand),this.useCooldown=4)),this._leftClicked=!1;return}if(i&&this._leftClicked&&(this._leftClicked=!1,this.entityTarget?(this.swing(),t.entities?.attack?.(this,this.entityTarget),this.exhaust(.1),this.resetCooldown(),this.breaking=null):this.target||(this.swing(),this.resetCooldown())),i&&!this.entityTarget&&this.target&&!this.adventure){let r=this.target;if(this.creative){if(this.swing(),this.breakCooldown<=0){let o=this.inventory.held;o&&re[o.id]?.toolType==="sword"||(t.events.emit("blockHit",{x:r.x,y:r.y,z:r.z,def:r.def,face:r.face}),this.breakBlock(r.x,r.y,r.z)),this.breakCooldown=5}}else if(this.breakCooldown<=0){let o=this.inventory.held;if((!this.breaking||this.breaking.x!==r.x||this.breaking.y!==r.y||this.breaking.z!==r.z||this.breaking.id!==r.id)&&(this.breaking={x:r.x,y:r.y,z:r.z,id:r.id,progress:0,ticks:0,item:o?.id},fi(r.def.name)?.onPunch?.(t,r.x,r.y,r.z,this),t.events.emit("blockHit",{x:r.x,y:r.y,z:r.z,def:r.def,face:r.face,start:!0}),this.digSpeed(r.def)>=1))return this.swing(),this.breakBlock(r.x,r.y,r.z),this.breaking=null,this.tickUse(n);let a=this.breaking;a&&(this.swing(),a.progress=Math.fround(a.progress+this.digSpeed(r.def)),a.ticks%4===0&&a.ticks>0&&t.events.emit("blockHit",{x:r.x,y:r.y,z:r.z,def:r.def,face:r.face}),a.ticks++,a.progress>=1&&(this.breakBlock(r.x,r.y,r.z),this.breaking=null,this.breakCooldown=5))}}else(!i||!this.target)&&(this.breaking=null);this.tickUse(n)}tickUse(t){t&&(this._rightClicked||this.useCooldown<=0)&&(this._rightClicked=!1,this.useCooldown=4,this.useItem()),t||(this._rightClicked=!1)}stopUsingItem(){let t=this.usingItem;if(!t)return;this.usingItem=null;let e=this.getHandStack(t.hand);t.beh?.onRelease?.(this.game,this,e,t.ticks,t.hand)}onMouseDown(t){t===0&&(this._leftClicked=!0,this.breakCooldown=0),t===2&&(this._rightClicked=!0),t===1&&this.pickBlock()}useItem(){let t=this.game,e=this.target,i=this.inventory.held,n=this.inventory.offhand.slots[0];if(this.entityTarget&&t.entities?.interact?.(this,this.entityTarget,i)){this.swing();return}if(e&&!this.entityTarget&&!(this.sneaking&&(i||n))){let r=fi(e.def.name);if(r?.onUse&&r.onUse(t,e.x,e.y,e.z,this,e,i)){this.swing();return}}for(let r of["main","off"]){let o=this.getHandStack(r);if(!o||this.itemCooldowns.has(o.id))continue;this.activeHand=r;let a=gh(o.id),l=o.count;if(a?.onUse&&(r==="main"||a.offhand)&&a.onUse(t,this,o,this.entityTarget?null:e,r)){this.swing(r),t.hand?.resetEquip?.(r),this.activeHand="main";return}let c=re[o.id];if(e&&!this.entityTarget&&c?.block&&!this.adventure){let h=Af(t,this,c.block,e,r);if(h){this.swing(r);let f=h.x!==void 0?h:{x:e.place[0],y:e.place[1],z:e.place[2]},u=gt[t.world.getBlock(f.x,f.y,f.z)];t.events.emit("blockPlace",{x:f.x,y:f.y,z:f.z,def:u,player:this,hand:r}),this.consumeHandItem(r,1),(this.creative||(this.getHandStack(r)?.count??0)!==l)&&t.hand?.resetEquip?.(r),this.activeHand="main";return}}if(a?.useDuration){let h=a.useDuration(o,this);if(h>0&&(!a.canStartUse||a.canStartUse(t,this,o,r))){this.usingItem={hand:r,stack:o,slot:this.inventory.selected,ticks:0,beh:a,duration:h},a.onStartUse?.(t,this,o,r),this.activeHand="main";return}}}this.activeHand="main"}breakBlock(t,e,i){let n=this.game,r=n.world,o=r.getBlock(t,e,i);if(!o)return!1;let a=gt[o],l=r.getMeta(t,e,i),c=fi(a.name);if(c?.canBreak&&!c.canBreak(n,t,e,i,this))return!1;let h=this.inventory.held,f=h?re[h.id]:null;n.events.emit("blockBreak",{x:t,y:e,z:i,id:o,meta:l,def:a,player:this});let u=0;if(a.name==="ice"&&!this.creative){let d=gt[r.getBlock(t,e-1,i)];(d.solid||d.liquid)&&(u=Re.water)}if(a.shape==="door"){let d=l&8?e-1:e+1;r.getBlock(t,d,i)===o&&r.setBlock(t,d,i,0,0)}else if(a.shape==="double_plant"){let d=l&1?e-1:e+1;r.getBlock(t,d,i)===o&&r.setBlock(t,d,i,0,0)}else if(a.shape==="bed"){let d=l&3,g=[[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]][d],_=l&4?-1:1,m=t+g[0]*_,p=i+g[2]*_;r.getBlock(m,e,p)===o&&r.setBlock(m,e,p,0,0)}if(r.setBlock(t,e,i,u,0),!this.creative){if(this.canHarvest(a)){let d=Wc(a,l,{tool:f?.toolType,tier:f?.toolTier,silk:!!h?.tag?.enchantments?.silk_touch,fortune:h?.tag?.enchantments?.fortune||0});for(let g of d)n.entities?.spawnItem?.(new Ze(g.item,g.count),t+.5,e+.3,i+.5);if(a.xp&&!h?.tag?.enchantments?.silk_touch){let g=a.xp[0]+Math.floor(Math.random()*(a.xp[1]-a.xp[0]+1));g&&n.entities?.spawnXP?.(t+.5,e+.5,i+.5,g)}}h&&f?.durability&&a.hardness>0&&this.damageHeld(f.toolType==="sword"?2:f.toolType?1:0),this.exhaust(.005)}return c?.onBreak?.(n,t,e,i,o,l,this),!0}damageHeld(t,e="main"){let i=this.getHandStack(e);if(!i||this.creative||t<=0)return;let n=re[i.id];if(!n?.durability)return;let r=i.tag?.enchantments?.unbreaking||0,o=0;for(let a=0;a<t;a++)r&&Math.random()>=1/(r+1)||o++;o&&(i.damage+=o,i.damage>=n.durability?(this.setHandStack(e,null),this.game.events.emit("itemBreak",{stack:i,player:this}),this.breakSound()):(e==="off"?this.inventory.offhand:this.inventory).changed())}pickBlock(){let t=this.target;if(!t||this.spectator)return;let e=t.def.item;if(t.def.name==="lit_furnace"&&(e="furnace"),!e||!re[e])return;let i=this.inventory;for(let r=0;r<9;r++)if(i.slots[r]?.id===e){this.selectSlot(r);return}let n=()=>{for(let r=0;r<9;r++){let o=(i.selected+r)%9;if(!i.slots[o])return o}for(let r=0;r<9;r++){let o=(i.selected+r)%9;if(!i.slots[o]?.tag?.enchantments)return o}return i.selected};if(this.creative){let r=-1;for(let a=9;a<36;a++)if(i.slots[a]?.id===e){r=a;break}let o=n();if(r>=0){let a=i.slots[o];i.slots[o]=i.slots[r],i.slots[r]=a}else{if(i.slots[o]){let a=i.firstEmpty();a>=9&&(i.slots[a]=i.slots[o])}i.slots[o]=new Ze(e,1)}i.selected=o,i.changed()}else for(let r=9;r<36;r++)if(i.slots[r]?.id===e){let o=n(),a=i.slots[o];i.slots[o]=i.slots[r],i.slots[r]=a,i.selected=o,i.changed();return}}dropHeld(t=!1){let e=this.inventory.held;if(!e||this.spectator)return;let i=t?e.count:1,n=e.clone(i);e.count-=i,e.count<=0?this.inventory.held=null:this.inventory.changed(),this.usingItem?.hand==="main"&&(this.usingItem=null),this.dropStack(n),this.swing()}dropStack(t,e=!1){if(!t)return;if(e){let f=Math.random()*.5,u=Math.random()*Math.PI*2;this.game.entities?.spawnItem?.(t,this.x,this.eyeY-.3,this.z,!1,[-Math.sin(u)*f,.2,Math.cos(u)*f],40);return}let[i,n,r]=this.lookDir(),o=Math.random()*Math.PI*2,a=.02*Math.random(),l=i*.3+Math.cos(o)*a,c=n*.3+.1+(Math.random()-Math.random())*.1,h=r*.3+Math.sin(o)*a;this.game.entities?.spawnItem?.(t,this.x,this.eyeY-.3,this.z,!1,[l,c,h],40),this.game.events.emit("itemDrop",{stack:t,player:this})}viewEffects(t,e=new kt){e.identity();let i=ux;if(this.dead){let r=Math.min(this.deathTime+t,20);e.multiply(i.makeRotationZ((40-8e3/(r+200))*Ui))}let n=this.hurtTime-t;if(n>=0&&this.hurtTime>0){let r=n/this.maxHurtTime;r=Math.sin(r*r*r*r*Math.PI);let o=this.attackedAtYaw;e.multiply(i.makeRotationY(-o*Ui)),e.multiply(i.makeRotationZ(-r*14*Ui)),e.multiply(i.makeRotationY(o*Ui))}if(this.game.settings.viewBobbing!==!1){let o=-(this.prevWalkDist+(this.walkDist-this.prevWalkDist)*t),a=this.prevBob+(this.bob-this.prevBob)*t;a>1e-5&&(e.multiply(i.makeTranslation(Math.sin(o*Math.PI)*a*.5,-Math.abs(Math.cos(o*Math.PI)*a),0)),e.multiply(i.makeRotationZ(Math.sin(o*Math.PI)*a*3*Ui)),e.multiply(i.makeRotationX(Math.abs(Math.cos(o*Math.PI-.2)*a)*5*Ui)))}return e}applyCamera(t,e){let i=this.prevX+(this.x-this.prevX)*e,n=this.prevY+(this.y-this.prevY)*e,r=this.prevZ+(this.z-this.prevZ)*e,o=this.prevEyeHeight+(this.eyeHeight-this.prevEyeHeight)*e,a=i,l=n+o,c=r,h=this.yaw,f=this.pitch;if(t.rotation.order="YXZ",this.sleeping){let _=this.sleeping.facing??0,m=[0,Math.PI,Math.PI/2,-Math.PI/2][_]+Math.PI;t.position.set(a,l+.3,c),t.rotation.set(0,m,0)}else if(this.perspective===0){t.position.set(a,l,c),t.rotation.set(f,h,0);let _=this.viewEffects(e,Of);fx(_)||(t.updateMatrix(),Fa.copy(_).invert(),Ba.multiplyMatrices(t.matrix,Fa),Ba.decompose(t.position,t.quaternion,kf))}else{let _=this.perspective===2,m=_?h+Math.PI:h,p=_?-f:f,[S,E,y]=this.lookDir(m,p),b=4,w=this.game.world;for(let R=0;R<8;R++){let v=((R&1)*2-1)*.1,T=((R>>1&1)*2-1)*.1,I=((R>>2&1)*2-1)*.1,L=wf(w,a+v,l+T,c+I,-S,-E,-y,b);L<b&&(b=L)}if(t.position.set(a-S*b,l-E*b,c-y*b),t.rotation.set(p,m,0),this.dead){t.updateMatrix();let R=this.viewEffects(e,Of);Fa.copy(R).invert(),Ba.multiplyMatrices(t.matrix,Fa),Ba.decompose(t.position,t.quaternion,kf)}}let u=this.prevFov+(this.fov-this.prevFov)*e,d=this.game.settings.fov??70;this._waterFov=(this._waterFov??1)+((this.headInWater||this.headInLava?60/70:1)-(this._waterFov??1))*.2;let g=d*u*this._waterFov;return Math.abs(t.fov-g)>.01&&(t.fov=g,t.updateProjectionMatrix()),{x:i,y:n,z:r}}toJSON(){return{x:this.x,y:this.y,z:this.z,yaw:this.yaw,pitch:this.pitch,health:this.health,food:this.food,saturation:this.saturation,exhaustion:this.exhaustion,foodTimer:this.foodTimer,air:this.air,absorption:this.absorption,xpLevel:this.xpLevel,xpProgress:this.xpProgress,xpTotal:this.xpTotal,inventory:this.inventory.toJSON(),spawnPoint:this.spawnPoint,flying:this.flying,fireTicks:this.fireTicks,fallDistance:this.fallDistance,effects:[...this.effects.entries()],dead:this.dead,vx:this.vx,vy:this.vy,vz:this.vz,onGround:this.onGround,pose:this.pose}}load(t){if(t){this.setPosition(t.x,t.y,t.z),this.yaw=t.yaw||0,this.pitch=t.pitch||0,this.armYaw=this.prevArmYaw=this.yaw,this.armPitch=this.prevArmPitch=this.pitch,this.bodyYaw=this.prevBodyYaw=this.mcYaw;for(let e of["health","food","saturation","exhaustion","foodTimer","air","absorption","xpLevel","xpProgress","xpTotal","flying","fireTicks","fallDistance","vx","vy","vz","onGround"])t[e]!==void 0&&(this[e]=t[e]);t.pose&&Ms[t.pose]&&t.pose!=="dying"&&(this.pose=t.pose,this.eyeHeight=this.prevEyeHeight=Ms[t.pose].eye),this.spawnPoint=t.spawnPoint||null,this.inventory.load(t.inventory),this.effects=new Map(t.effects||[]),this.effects.has("health_boost")&&(this.maxHealth=20+4*(this.effects.get("health_boost").amp+1)),t.dead&&(this.dead=!1,this.respawn())}}},ux=new kt,Of=new kt,Fa=new kt,Ba=new kt,kf=new k;function fx(s){let t=s.elements;return t[0]===1&&t[5]===1&&t[10]===1&&t[12]===0&&t[13]===0&&t[14]===0&&t[1]===0&&t[2]===0&&t[4]===0&&t[6]===0&&t[8]===0&&t[9]===0}function dx(s){if(!s)return null;if(typeof s=="string")return s;let t=s.customName||s.displayName||s.def?.displayName||s.type||s.name;return t?String(t).split("_").map(e=>e[0].toUpperCase()+e.slice(1)).join(" "):null}function px(s,t,e={},i){let n=i?.name||"Player",r=dx(t?.shooter||t?.owner||t);switch(s){case"fall":return(e.distance??0)>5?`${n} fell from a high place`:`${n} hit the ground too hard`;case"drown":return`${n} drowned`;case"lava":return`${n} tried to swim in lava`;case"fire":return`${n} went up in flames`;case"fire_tick":return`${n} burned to death`;case"hot_floor":return`${n} discovered the floor was lava`;case"starve":return`${n} starved to death`;case"void":return`${n} fell out of the world`;case"cactus":return`${n} was pricked to death`;case"suffocation":return`${n} suffocated in a wall`;case"magic":case"poison":return r?`${n} was killed by ${r} using magic`:`${n} was killed by magic`;case"wither":return`${n} withered away`;case"explosion":return r?`${n} was blown up by ${r}`:`${n} blew up`;case"arrow":return r?`${n} was shot by ${r}`:`${n} was shot by arrow`;case"lightning":return`${n} was struck by lightning`;case"kill":return`${n} was killed`;case"mob":case"player":return r?`${n} was slain by ${r}`:`${n} died`;case"thorns":return r?`${n} was killed trying to hurt ${r}`:`${n} died`;case"sweet_berry_bush":return`${n} was poked to death by a sweet berry bush`;default:return r?`${n} was slain by ${r}`:`${n} died`}}function Wc(s,t,e={}){let i=Math.random;if(e.silk&&s.item&&s.drops!==void 0&&s.creative)return[{item:s.item,count:1}];let n=s.drops;if(n===null)return[];if(n===void 0)return s.item?[{item:s.item,count:s.shape==="slab"&&t===2?2:1}]:[];if(typeof n=="string"){let r=1;return e.fortune&&["coal","diamond","emerald","lapis_lazuli","quartz","raw_iron","raw_gold","raw_copper"].includes(n)&&(r*=Math.max(1,Math.floor(i()*(e.fortune+2)))),[{item:n,count:r}]}return typeof n=="function"?n(t,i,e).filter(r=>r.count>0):n.filter(r=>r.chance===void 0||i()<r.chance).map(r=>({item:r.item,count:(r.min??1)+Math.floor(i()*((r.max??r.min??1)-(r.min??1)+1))})).filter(r=>r.count>0)}var rb=[0,1,4,5];var ob=(s,t,e)=>((s+524288)*1048576+(e+524288))*256+t,ab=(s,t)=>Math.floor(s()*t),Oa=Object.create(null),zf=new Set;function lb(s,t,e,i=0){for(let n of Array.isArray(s)?s:[s]){if(!Qi[n])continue;let r=Oa[n]||(Oa[n]=Object.create(null)),o=r[t];if(!o){o=r[t]=[];let a=fi(n)?.[t];a&&o.push({fn:a,prio:1e3,foreign:!0});let l=mx(o);zf.add(l),r[t+"$d"]=l,$a(n,{[t]:l})}o.push({fn:e,prio:i}),o.sort((a,l)=>l.prio-a.prio)}}function mx(s){return function(...t){for(let e=0;e<s.length;e++){let i=s[e].fn(...t);if(i)return i}return!1}}function cb(){for(let s in Oa){let t=Oa[s];for(let e in t){if(e.endsWith("$d"))continue;let i=t[e+"$d"],n=Es[s]?.[e];n&&n!==i&&!zf.has(n)&&(t[e].push({fn:n,prio:1e3,foreign:!0}),t[e].sort((r,o)=>o.prio-r.prio),$a(s,{[e]:i}))}}}function hb(s,t){if(!s||!Se[s])return!1;let e=gt[s];switch(e.shape){case"cube":return!e.liquid;case"slab":return t===1||t===2;case"stairs":return(t&4)!==0;case"snow_layer":return(t&7)===7;case"fence":case"wall":return!0;case"soul_sand":return!0;default:return e.name==="soul_sand"}}function ub(s){return oi[s]===1||!!s&&gt[s].shape==="cube"&&Se[s]===1&&!gt[s].liquid}function fb(s){return s!==0&&Se[s]===1&&!gt[s].liquid}function db(s,t,e,i){let n=s.getLight(t,e,i);return Math.max(n>>4,n&15)}function pb(s,t,e,i){return s.getLight(t,e,i)&15}function gx(s,t,e,i){let n=s.getChunkAt(t,i);return n?e>=n.heightMap[(i&15)<<4|t&15]:!1}function _x(s,t,e,i){let r=Ga(s.getBiome(t,i)).temperature;return e>64&&(r-=(e-64)*.05/30),r}function xx(s,t,e){return Ga(s.getBiome(t,e))}function mb(s,t,e,i){let n=s.weather;return!n||!(n.raining||n.rain>.2)||s.world.dimension!=="overworld"||!gx(s.world,t,e,i)||xx(s.world,t,i).precipitation!=="rain"?!1:_x(s.world,t,e,i)>=.15}function Vf(s,t,e,i,n,r=1,o=1){try{s.audio?.play?.(t,{x:e+.5,y:i+.5,z:n+.5,volume:r,pitch:o})}catch{}}function vx(s,t,e,i,n,r=1,o=.5,a){let l=s.particles;if(l?.spawn)for(let c=0;c<r;c++)try{l.spawn(t,e+(Math.random()-.5)*o*2,i+(Math.random()-.5)*o*2,n+(Math.random()-.5)*o*2,(Math.random()-.5)*.02,.02+Math.random()*.03,(Math.random()-.5)*.02,a)}catch{return}}function gb(s,t,e,i){Vf(s,"random.fizz",t,e,i,.5,2.6+(Math.random()-Math.random())*.8),vx(s,"smoke",t+.5,e+1,i+.5,6,.4)}function yx(s,t,e,i,n){try{s.entities?.spawnItem?.(t,e,i,n,!0)}catch(r){console.error(r)}}function Mx(s,t,e,i,n,r){!t||e<=0||yx(s,new Ze(t,e),i+.5,n+.5,r+.5)}function Sx(s,t,e,i,n,r,o={}){let a=gt[n];if(!a)return;let l;try{l=Wc(a,r,o)}catch{l=[]}for(let c of l)Mx(s,c.item,c.count,t,e,i)}function _b(s,t,e,i,n=!0,r=0,o=0){let a=s.world,l=a.getBlock(t,e,i);if(!l)return!1;let c=a.getMeta(t,e,i),h=gt[l];a.setBlock(t,e,i,r,o);try{s.particles?.blockBreak?.(t,e,i,h,c)}catch{}return Vf(s,"dig."+(h.soundGroup||h.sound||"stone"),t,e,i,1,.8),n&&!bx(h,c)&&Sx(s,t,e,i,l,c),!0}function bx(s,t){return s.shape==="door"?(t&8)!==0:s.shape==="double_plant"?(t&1)!==0:s.shape==="bed"?(t&4)===0:!1}function xb(s){return s.gameMode==="creative"}export{un as a,He as b,Pi as c,fs as d,Gl as e,$h as f,nu as g,ql as h,Yl as i,au as j,rs as k,ro as l,Ce as m,sr as n,dn as o,ni as p,li as q,si as r,Yi as s,Bs as t,fd as u,Ft as v,Ii as w,k as x,Lt as y,Gt as z,ne as A,kt as B,on as C,Rn as D,Wt as E,Cl as F,Rl as G,Wi as H,qe as I,Ws as J,ye as K,Xi as L,Ve as M,po as N,Il as O,Ys as P,ti as Q,Pl as R,mo as S,Zs as T,Ll as U,Dl as V,Js as W,go as X,vo as Y,Nl as Z,Ul as _,hs as $,Fl as aa,Qs as ba,Bl as ca,ei as da,Xe as ea,Ol as fa,zl as ga,sf as ha,qa as ia,xe as ja,ch as ka,ji as la,hh as ma,Qf as na,Nx as oa,Jf as pa,wi as qa,$f as ra,ui as sa,mh as ta,Gx as ua,ci as va,yf as wa,df as xa,Mf as ya,Sf as za,Ia as Aa,_n as Ba,Es as Ca,$a as Da,fi as Ea,Ef as Fa,K_ as Ga,Fn as Ha,$e as Ia,gh as Ja,Cf as Ka,Rf as La,If as Ma,RS as Na,IS as Oa,Hc as Pa,FS as Qa,Bf as Ra,Wc as Sa,rb as Ta,ob as Ua,ab as Va,lb as Wa,cb as Xa,hb as Ya,ub as Za,fb as _a,db as $a,pb as ab,gx as bb,_x as cb,xx as db,mb as eb,Vf as fb,vx as gb,gb as hb,Mx as ib,Sx as jb,_b as kb,xb as lb};
