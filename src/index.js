import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshLambertMaterial,
    Mesh,
    TextureLoader,
    DirectionalLight,
} from "three";
import "./index.scss";

let s, p, r, cube;

const init = () => {
    const { innerHeight: height, innerWidth: width } = window;

    s = new Scene();
    r = new WebGLRenderer({
        antialias: true
    });
    p = new PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );

    r.setSize(width, height - 4);
    document.getElementById("root").appendChild(r.domElement);

    const g = new BoxGeometry(1, 1, 1);
    const t = new TextureLoader().load("assets/crate.gif");
    const m = new MeshLambertMaterial({
        map: t
    });
    cube = new Mesh(g, m);
    s.add(cube);

    const l1 = new DirectionalLight(0xeeff00, 1);
    l1.castShadow = true;
    l1.position.set(-1, -1, -1);
    s.add(l1);

    const l2 = new DirectionalLight(0xeeff00, 1);
    l2.castShadow = true;
    l2.position.set(2, 1, 0);
    s.add(l2);

    const l3 = new DirectionalLight(0xeeffe0, 1);
    l3.castShadow = true;
    l3.position.set(-2, 2, 2);
    s.add(l3);

    const l4 = new DirectionalLight(0xeeffff, 1);
    l4.castShadow = true;
    l4.position.set(0, 0, -5);
    s.add(l4);

    p.position.z = 3;
    p.lookAt(s.position);

};

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += .01;
    cube.rotation.y += .01;
    r.render(s, p);
};

const windowResize = () => {
    const { innerHeight: height, innerWidth: width } = window;
    p.aspect = width / height;
    p.updateProjectionMatrix();
    r.setSize(width, height);
};

init();
animate();

window.addEventListener("resize", windowResize, false);
