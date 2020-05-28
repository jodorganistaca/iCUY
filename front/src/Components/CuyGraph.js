import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import img from '../assets/cuy.svg'
import imgF from '../assets/goal.svg'

const CuyGraph = (props) => {

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [currentState, setCurrentState] = useState(0)

    useEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: 50
            });
            const a = props.completed / props.total;
            setCurrentState(a.toFixed(2));
        }
    }, []);

    d3.select(".progressCuy").html("");
    d3.select(".progressNumber").html("");

    const svg = d3.select('.progressCuy')
        .append('svg')
        .attr('height', dimensions.height)
        .attr('width', dimensions.width)
        .attr('y', 20);

    svg.append('rect')
        .attr('class', 'bg-rect')
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('fill', '#62bbc5')
        .attr('height', 15)
        .attr('width', dimensions.width - 50)
        .attr('x', 0)
        .attr('y', 20);

    const progress = svg.append('rect')
        .attr('class', 'progress-rect')
        .attr('fill', '#0e4b6e')
        .attr('height', 15)
        .attr('width', 0)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('x', 0)
        .attr('y', 20);

    const cuy = svg.append('image')
        .attr("xlink:href", img)
        .attr('width', 30)

    progress.transition()
        .duration(1000)
        .attr('width', currentState * dimensions.width - 50);

    cuy.transition()
        .duration(1000)
        .attr('x', currentState * dimensions.width - 75);

    const goal = svg.append('image')
        .attr("xlink:href", imgF)
        .attr('width', 30)
        .attr('x', dimensions.width - 60)
        .attr('y', 0);

    const svgCompl = d3.select('.progressNumber')
        .append('svg')
        .attr('height', 100)
        .attr('width', 100);

    svgCompl.append('circle')
        .attr('fill', '#0e4b6e')
        .attr('cx', 50)
        .attr('cy', 50)
        .attr('r', 50)
        .attr('height', 100)
        .attr('width', 100);

    svgCompl.append('text')
        .attr('x', 20)
        .attr('y', 55)
        .attr('font-size', 20)
        .attr('fill', '#FFF')
        .text(props.completed + "/" + props.total);

    return (
        <div>
            <h1 style={{color:'#0e4b6e'}}>Tu progreso el día de hoy</h1>
            <h2 style={{margin: '40px 0 20px 0',color:'#FFF',background:'#0e4b6e',padding:'5px'}}>Cumplimiento porcentual de tus hábitos</h2>
            <div class="progressCuy" ref={targetRef}>Prrogress</div>
            <h3><strong>{currentState*100}%</strong></h3>
            <h2 style={{margin: '40px 0 0 0',color:'#FFF',background:'#0e4b6e',padding:'5px'}}>Cumplimiento de tus hábitos</h2>
            <div class="progressNumber"  style={{margin: '20px 0 0 0'}}></div>
            <p style={{margin: '20px 0 0 0', fontSize:'18px'}}>Has completado <strong>{props.completed}</strong> hábitos de tus <strong>{props.total}</strong> hábitos registrados el día de hoy.</p>
        </div>
    )

}

export default CuyGraph

