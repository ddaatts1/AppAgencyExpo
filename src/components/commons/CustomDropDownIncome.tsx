import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SVG } from "../../constants";

// Create a custom hook to detect clicks outside the dropdown
function useDetectOutsideClick(ref: React.RefObject<View>, initialState: boolean) {
    const [isActive, setIsActive] = useState(initialState);

    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsActive(false);
        }
    };

    return [isActive, setIsActive] as const;
}

export default function CustomDropDownIncome(props:any) {
    const {setStatus} = props
    const dropdownRef = useRef<View>(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const toggleDropdown = () => {
        setIsActive(!isActive);
    };

    function handleOptionSelect(values: any) {
        setStatus(values)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ position: 'relative' }}>
                <TouchableOpacity onPress={toggleDropdown}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                        <SVG.IconFilter width={20} height={20} />
                    </View>
                </TouchableOpacity>

                {isActive && (
                    <View
                        ref={dropdownRef}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            width: 200,
                            zIndex: 999,
                            left: -150,
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                            borderRadius: 10, // Add border radius
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 18,
                                textAlign: "center",
                                fontWeight:"bold",
                                borderBottomWidth: 1,
                                borderBottomColor: "#29A7E0",
                                padding:15
                            }}>Trạng thái </Text>
                            <TouchableOpacity onPress={() => handleOptionSelect("1")}>
                                <Text style={{
                                    fontSize: 16,
                                    padding: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#FFFAEF",
                                    color:'#000000'
                                }}>Đã duyệt</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionSelect("0")}>
                                <Text style={{
                                    fontSize: 16,
                                    padding: 15,
                                    color:'#000000'
                                }}>Chờ Xử lý</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionSelect("2")}>
                                <Text style={{
                                    fontSize: 16,
                                    padding: 15,
                                    color:'#000000'
                                }}>Đã hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}
