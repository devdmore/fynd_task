import React, { Component } from 'react';
import styled from "styled-components";

const H1 = styled.h1`
    font-size: 1.2em; text-align: left;
    color: black; font-weight: bold; padding-bottom: 20px;
`;
const Title = styled.h1`
    font-size: 1em; text-align: left;
    color: black; font-weight: 600; margin-top: 20px;
`;
const Form = styled.form`
    text-align: left; padding : 30px 0;
`;
const FormControl = styled.div`
    font-size: 1em; text-align: left;
`;
const Btnssection = styled.div`
    background:#fff; padding: 20px; height: 20px;
`;
const Btn = styled.button`
    background:none; border: none; color: gray; padding: 0 15px;
    font-size: .80em; font-weight : bold; cursor : pointer;
`;
const Ul = styled.ul`
    background:#fff; margin:0; max-height: 200px; overflow: auto;
`;
const Li = styled.li`
    color: #444; font-size: .8em;
    padding: 10px 10px; border-bottom : 1px solid #ddd;
`;
const Input = styled.input`
    width: calc(100% - 35px); padding:10px 15px; font-size: 0.80em;
    background:#fff; outline: none;
`;
const Select = styled.select`
    width: 100%; padding:5px 15px; font-size: 0.80em;
    height: 40px; background:#fff;outline: none;
`;
const Checkbox = styled.input`
    padding : 5px; margin-right: 8px;
`;
const Label = styled.label`
    text-transform : capitalise;
`;

export default class SimpleSelect extends Component {
    constructor(){
        super();
        this.state = ({
            Colors : ['red', 'yellow', 'green', 'blue'],
            Comps : [
                { 'title' : 'Button', 'path': 'demo-button' },
                { 'title' : 'Selection Control', 'path': 'demo-selection-control' },
                { 'title' : 'Input', 'path': 'demo-input' },
                { 'title' : 'Snackbar', 'path': 'demo-snack-bar' },
                { 'title' : 'Chips', 'path': 'demo-chips' },
                { 'title' : 'Progress Tabs', 'path': 'demo-vertical-tabs' },
                { 'title' : 'Typography', 'path': 'demo-wip' },
                { 'title' : 'Card', 'path': 'demo-wip' },
                { 'title' : 'Pagination', 'path': 'demo-wip' }
            ],
            colorsResult : [],
            componentsResult : [],
            mainSelectedOption : 'colors'
        });
        // onChange event for main dropdown
        this.mainSelectChange = event => {
            var val = event.target.value;
            var bios = document.getElementsByClassName('tab');
            for(var i=0; i<bios.length; i++){
                bios[i].style.display = 'none';
            }
            document.getElementById(val).style.display='block';
            document.getElementById("selected_result").selectedIndex = (val === "colors" ? '0' : '1');
            this.setState({ mainSelectedOption : val });
        }
        // Reset event - Form clear button
        this.reset = () => {
            document.getElementById("colors").style.display='block';
            document.getElementById("components").style.display='none';
            document.getElementById("selected_result");
            this.setState({ colorsResult : '' });
            this.setState({ componentsResult : '' });
        }
        // Update result - Checkbox checked event
        this.updateResult = resName => {
            let result = []; 
            var boxes = document.getElementsByName(resName);
            for(var i = 0; i < boxes.length; i++){
                if(boxes[i].type === 'checkbox' && boxes[i].checked === true){
                    result.push(boxes[i].value);
                }
            }
            resName === "colors" ? 
            this.setState({ colorsResult : result.join(', ') }) :
            this.setState({ componentsResult : result.join(', ') });
            
        }
        // Search functionality for Search field
        this.filterOptions = (e) => {
            var search = e.target.value;
            let ops = document.querySelectorAll(`#${this.state.mainSelectedOption} ul li`);
            ops.forEach(el => {
                // if matching string is greater than -1;
                if(el.dataset.val.trim().toLowerCase().indexOf(search.toLowerCase()) > -1)
                    el.style.display = "block";
                else el.style.display = "none";
            });
            
        }
    }
    render() {
        return (
            <Form>
                <H1>Dropdown with search</H1>
                <Title>Default</Title>
                <FormControl>
                <Select id="main_selection" onChange={this.mainSelectChange}>
                    <option value="colors">Colours</option>
                    <option value="components">Components</option>
                </Select>
                </FormControl>
                <div className="searchbar">
                    <Title>Dropdown</Title>
                    <FormControl>
                        <Input type="text" placeholder="Search.." onKeyUp={this.filterOptions.bind(this)} />
                    </FormControl>
                </div>
                <div id="colors" className="tab">
                    <Ul className="text-left optimize">
                        {this.state.Colors.map(color => 
                            <Li className="form-control" key={color} data-val={color}>
                                <Label>
                                    <Checkbox type="checkbox" name="colors" value={color}
                                    onClick={this.updateResult.bind(this, 'colors')} />
                                    {color}
                                </Label>
                            </Li>
                        )}
                    </Ul>
                </div>
                <div id="components" className="tab" style={{display:'none'}}>
                    <Ul className="text-left optimize">
                        {this.state.Comps.map(comp => 
                            <Li className="form-control" key={comp.title} data-val={comp.title}>
                                <Label>
                                    <Checkbox type="checkbox" name="components" value={comp.title} 
                                    onClick={this.updateResult.bind(this, 'components')} />
                                    {comp.title}
                                </Label>
                            </Li>
                        )}
                    </Ul>
                </div>
                <Btnssection className="btns" style={{textAlign:'right'}}>
                    <Btn type="reset" onClick={this.reset}>Clear</Btn>
                    <Btn type="submit" style={{color: 'mediumaquamarine'}}>Submit</Btn>
                </Btnssection>
                <div className="Result">
                <Title>Result</Title>
                    <Select id="selected_result" onChange={this.mainSelectChange}>
                        <option value="colors">colors - {this.state.colorsResult}</option>
                        <option value="components">Components - {this.state.componentsResult}</option>
                    </Select>
                </div>
            </Form>
        )
    }
}
